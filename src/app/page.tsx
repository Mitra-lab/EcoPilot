import React from "react";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: "📊",
      title: "Carbon Assessment",
      description: "Answer simple behavior questions regarding family size, diets, and transit distance to calculate your annual CO₂ score.",
    },
    {
      icon: "🤖",
      title: "AI Sustainability Coach",
      description: "Receive personalized, actionable recommendations driven by Gemini to target carbon reduction where it matters most.",
    },
    {
      icon: "🎯",
      title: "Weekly Habit Challenges",
      description: "Take focused challenges customized to your highest footprint sources and build sustainable habits.",
    },
    {
      icon: "📝",
      title: "Verification Workflow",
      description: "Submit written logs confirming completion of activities, ensuring accountability before points are distributed.",
    },
    {
      icon: "🏅",
      title: "Rewards & Standing Tiers",
      description: "Earn Green Points to advance standing tiers, unlock badges, and visualize carbon footprint improvements.",
    },
  ];

  const steps = [
    { num: "1", title: "Assessment", desc: "Calculate score" },
    { num: "2", title: "Dashboard", desc: "Visualize metrics" },
    { num: "3", title: "AI Coach", desc: "Get recommendations" },
    { num: "4", title: "Challenge", desc: "Select weekly habit" },
    { num: "5", title: "Verification", desc: "Submit completion notes" },
    { num: "6", title: "Rewards", desc: "Unlock achievement badges" },
  ];

  const benefits = [
    "Build sustainable habits that last",
    "Directly reduce your environmental carbon footprint",
    "Track per-capita savings and progress over time",
    "Earn gamified achievement badges and standing ranks",
  ];

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen text-[hsl(var(--foreground))]">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 px-3 py-1 rounded-full mb-6">
          MVP Release
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[hsl(var(--foreground))] mb-6">
          EcoPilot
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-[hsl(var(--primary))] mb-6">
          AI-Powered Sustainability Guidance for Everyday Actions
        </p>
        <p className="max-w-2xl text-base md:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-10">
          Track, understand, and reduce your carbon footprint through personalized insights, challenges, verification, and rewards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/assessment"
            className="px-8 py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold rounded-lg hover:bg-[hsl(var(--primary))]/90 shadow-lg text-center transition-colors"
          >
            Start Assessment
          </Link>
          <a
            href="#features"
            className="px-8 py-4 border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] font-bold rounded-lg hover:bg-[hsl(var(--muted))] text-center transition-colors"
          >
            View Features
          </a>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="border-t border-[hsl(var(--border))] py-20 bg-[hsl(var(--card))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[hsl(var(--foreground))]">
              Core Platform Capabilities
            </h2>
            <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
              Everything you need to transform awareness into environmental action
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 border border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--background))] shadow-sm flex flex-col space-y-4 hover:border-[hsl(var(--primary))]/30 transition-colors"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">{feature.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-[hsl(var(--border))] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[hsl(var(--foreground))]">
              How It Works
            </h2>
            <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
              Our structured habit-building loop guides you from estimation to action
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {steps.map((step, i) => (
              <div
                key={i}
                className="p-5 border border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--card))] shadow-sm flex flex-col items-center justify-between"
              >
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-black flex items-center justify-center text-sm mb-3">
                  {step.num}
                </div>
                <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">{step.title}</h4>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1 leading-snug">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="border-t border-[hsl(var(--border))] py-20 bg-[hsl(var(--card))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[hsl(var(--foreground))] mb-6">
                Make a Measurable Impact
              </h2>
              <p className="text-base text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                Most calculators stop at calculating your score. EcoPilot is designed to help you take action, verify completion, and build long-term sustainable habits.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-[hsl(var(--muted-foreground))]">
                    <span className="text-[hsl(var(--primary))] text-lg font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-xl shadow-inner text-center">
              <span className="text-5xl">🌍</span>
              <h4 className="text-xl font-bold text-[hsl(var(--foreground))] mt-4">One Platform, Complete Focus</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">
                EcoPilot ensures that carbon awareness matches physical actions and verified habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[hsl(var(--border))] py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[hsl(var(--foreground))] mb-4">
            Ready to begin your sustainability journey?
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">
            Complete the 1-minute Carbon Assessment and receive personalized AI actions.
          </p>
          <Link
            href="/assessment"
            className="px-8 py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold rounded-lg hover:bg-[hsl(var(--primary))]/90 shadow-lg inline-block transition-colors"
          >
            Start Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
