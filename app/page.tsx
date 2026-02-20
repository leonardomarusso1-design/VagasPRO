"use client";

import React, { useEffect, useState } from "react";
import { AppStep, PlanType, UserData, ResumeContent } from "@/types";
import { generateOptimizedResume } from "../lib/gemini";
import { LandingPage } from "@/components/LandingPage";
import { Quiz } from "./quiz/Quiz";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/Button";
import { Analyzing } from "@/components/Analyzing";
import { Preview } from "@/components/Preview";
import { Checkout } from "@/components/Checkout";
import { LoginModal } from "@/components/LoginModal";

export default function Page() {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [resumeContent, setResumeContent] = useState<ResumeContent | null>(null);
  const [plan, setPlan] = useState<PlanType>(PlanType.NONE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanType>(PlanType.PRO);
  const [orderBumpActive, setOrderBumpActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("google") === "true") {
      setShowLoginModal(false);
      setStep(AppStep.CHECKOUT);
      return;
    }

    if (params.get("success") === "true") {
      const planParam = params.get("plan");
      setPlan(planParam === "PRO" ? PlanType.PRO : PlanType.BASIC);
      setStep(AppStep.DASHBOARD);
      return;
    }

    const savedStep = localStorage.getItem("vagaspro_step");
    const savedData = localStorage.getItem("vagaspro_data");
    const savedContent = localStorage.getItem("vagaspro_content");
    const savedPlan = localStorage.getItem("vagaspro_plan");

    if (savedStep && params.get("resume") === "true") setStep(savedStep as AppStep);
    if (savedData) setUserData(JSON.parse(savedData));
    if (savedContent) setResumeContent(JSON.parse(savedContent));
    if (savedPlan) setPlan(savedPlan as PlanType);
  }, []);

  useEffect(() => {
    localStorage.setItem("vagaspro_step", step);
  }, [step]);

  useEffect(() => {
    if (userData) localStorage.setItem("vagaspro_data", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    if (resumeContent) localStorage.setItem("vagaspro_content", JSON.stringify(resumeContent));
  }, [resumeContent]);

  useEffect(() => {
    localStorage.setItem("vagaspro_plan", plan);
  }, [plan]);

  const handleQuizComplete = async (data: UserData) => {
    setUserData(data);
    setStep(AppStep.ANALYZING);

    const startTime = Date.now();
    try {
      const generated = await generateOptimizedResume(data);
      const elapsed = Date.now() - startTime;
      const minDelay = 2500;

      setTimeout(() => {
        setResumeContent(generated);
        setStep(AppStep.PREVIEW);
      }, Math.max(0, minDelay - elapsed));
    } catch (e) {
      console.error(e);
      setStep(AppStep.QUIZ);
    }
  };

  const handleUnlock = () => setShowLoginModal(true);

  const handleLogin = async () => {
    try {
      setIsProcessing(true);
      const res = await fetch("/api/auth/google");
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setIsProcessing(false);
      }
    } catch {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    try {
      setPaymentProcessing(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlanForCheckout === PlanType.PRO ? "PRO" : "BASIC",
          hasBump: orderBumpActive,
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setPaymentProcessing(false);
      }
    } catch {
      setPaymentProcessing(false);
    }
  };

  const hasModernAccess = () => {
    if (plan === PlanType.PRO) return true;
    if (plan === PlanType.BASIC) {
      return orderBumpActive || localStorage.getItem("vagaspro_bump") === "true";
    }
    return false;
  };

  if (step === AppStep.LANDING) return <LandingPage onStart={() => setStep(AppStep.QUIZ)} />;
  if (step === AppStep.QUIZ) return <Quiz onComplete={handleQuizComplete} />;
  if (step === AppStep.ANALYZING) return <Analyzing />;
  
  if (step === AppStep.PREVIEW && userData) {
    return (
      <>
        <Preview data={userData} content={resumeContent} onUnlock={handleUnlock} />
        {showLoginModal && (
          <LoginModal
            isProcessing={isProcessing}
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        )}
      </>
    );
  }

  if (step === AppStep.CHECKOUT) {
    return (
      <Checkout
        plan={selectedPlanForCheckout}
        orderBumpActive={orderBumpActive}
        onToggleBump={() => setOrderBumpActive(!orderBumpActive)}
        onPayment={handlePayment}
        isProcessing={paymentProcessing}
        onBack={() => setStep(AppStep.PREVIEW)}
      />
    );
  }

  if (step === AppStep.DASHBOARD && userData)
    return <Dashboard data={userData} content={resumeContent} plan={plan} hasModernAccess={hasModernAccess()} />;

  return <div>Loading...</div>;
}
