"use client";

import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";

const maternalIntelligenceTopics = [
  {
    title: "RAS Test",
    sections: [
      {
        label: "What it is:",
        copy: "A personalised assessment that reviews key pregnancy and health factors to help you understand your likelihood of developing gestational diabetes.",
      },
      {
        label: "Why it matters:",
        copy: "Understanding your risk earlier can help you discuss prevention, monitoring and healthy lifestyle choices with your healthcare team during pregnancy.",
      },
      {
        label: "What it means for your care:",
        copy: "Your result provides risk context, not a diagnosis, helping inform conversations with qualified professionals about appropriate follow up and pregnancy care.",
      },
    ],
  },
  {
    title: "Nutrition",
    sections: [
      {
        label: "What it is:",
        copy: "Personalised nutrition guidance designed around your pregnancy stage, weight goals, dietary needs and preferences to support healthier choices throughout pregnancy.",
      },
      {
        label: "Why it matters:",
        copy: "Nutrition influences healthy weight gain, metabolic health and overall pregnancy wellbeing, making appropriate food choices an important part of ongoing maternal care.",
      },
      {
        label: "What it means for your care:",
        copy: "Your nutrition plan supports appropriate weight management and pregnancy needs while complementing individual advice provided by your doctor or qualified nutrition professional.",
      },
    ],
  },
  {
    title: "Fitness",
    sections: [
      {
        label: "What it is:",
        copy: "Pregnancy appropriate activity guidance designed around your stage, needs and physical condition, with exercises developed to support safe, sustainable movement.",
      },
      {
        label: "Why it matters:",
        copy: "Regular appropriate activity can support weight management, physical wellbeing and healthy pregnancy routines when undertaken according to individual needs and professional advice.",
      },
      {
        label: "What it means for your care:",
        copy: "Your activity guidance supports healthy movement throughout pregnancy while remaining complementary to medical advice, individual limitations and recommendations from qualified healthcare professionals.",
      },
    ],
  },
  {
    title: "Monitor",
    sections: [
      {
        label: "What it is:",
        copy: "A simple way to record and follow weight changes from preconception through pregnancy, turning individual measurements into a clearer personal weight trajectory.",
      },
      {
        label: "Why it matters:",
        copy: "Following weight over time helps you understand your direction, recognise meaningful changes and stay engaged with recommended pregnancy weight goals.",
      },
      {
        label: "What it means for your care:",
        copy: "Your weight trajectory provides useful context for discussions with your healthcare team about pregnancy progress, nutrition, activity and appropriate weight management.",
      },
    ],
  },
] as const;

const fetalGrowthIntelligenceTopics = [
  {
    title: "Pregnancy Dating",
    sections: [
      {
        label: "What it is:",
        copy: "Gestational age establishes the most reliable pregnancy timeline, helping align your baby’s measurements with the correct stage of pregnancy from early care onward.",
      },
      {
        label: "Why it matters:",
        copy: "An accurate pregnancy timeline helps ensure later ultrasound measurements are interpreted against the right stage, reducing confusion when growth is reviewed over time.",
      },
      {
        label: "What it means for your care:",
        copy: "It gives your healthcare team a consistent reference point for dating, monitoring growth, and interpreting changes across scans throughout the pregnancy journey.",
      },
    ],
  },
  {
    title: "Biometry",
    sections: [
      {
        label: "What it is:",
        copy: "Biometry uses ultrasound measurements of your baby’s body, such as head, abdomen, and limbs, to assess size and development at each pregnancy stage.",
      },
      {
        label: "Why it matters:",
        copy: "These measurements help show how your baby is growing at a particular moment and provide important context for comparing findings across later scans.",
      },
      {
        label: "What it means for your care:",
        copy: "Your clinician can use biometric measurements alongside gestational age and other findings to understand whether growth appears appropriate for your individual pregnancy.",
      },
    ],
  },
  {
    title: "Longitudinal Growth Analysis",
    sections: [
      {
        label: "What it is:",
        copy: "Longitudinal growth analysis connects measurements from multiple scans, showing how your baby’s size and growth pattern change across pregnancy rather than at one visit.",
      },
      {
        label: "Why it matters:",
        copy: "Looking across several scans can reveal growth direction and pace more clearly than a single measurement, helping clinicians understand whether patterns remain consistent.",
      },
      {
        label: "What it means for your care:",
        copy: "It helps your healthcare team interpret growth as a developing trajectory, supporting more informed follow-up when changes between scans deserve closer attention.",
      },
    ],
  },
  {
    title: "Doppler Lookup",
    sections: [
      {
        label: "What it is:",
        copy: "Doppler ultrasound assesses blood flow in selected maternal and fetal vessels, adding functional information about how the placenta and baby are being supported.",
      },
      {
        label: "Why it matters:",
        copy: "Blood-flow patterns can provide additional context when growth needs closer assessment, helping clinicians understand circulation alongside ultrasound measurements and growth trends.",
      },
      {
        label: "What it means for your care:",
        copy: "When clinically appropriate, Doppler findings and staging can help your healthcare team organise risk, plan monitoring, and decide whether follow-up should be intensified.",
      },
    ],
  },
] as const;

export function PatientStepInsideCarousel() {
  const stageRef = useRef<HTMLElement>(null);
  const maternalNarrativeRef = useRef<HTMLDivElement>(null);
  const fetalNarrativeRef = useRef<HTMLDivElement>(null);
  const [maternalNarrativeTravel, setMaternalNarrativeTravel] = useState(0);
  const [fetalNarrativeTravel, setFetalNarrativeTravel] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] });
  const { scrollYProgress: approachProgress } = useScroll({
    target: stageRef,
    offset: ["start 95%", "start 15%"],
  });
  const smoothApproachProgress = useSpring(approachProgress, {
    damping: 26,
    mass: 0.3,
    stiffness: 82,
  });
  const maternalProgress = useTransform(scrollYProgress, [0.145, 0.42], [0, 1], { clamp: true });
  const maternalNarrativeY = useTransform(
    maternalProgress,
    (value) => -value * maternalNarrativeTravel,
  );
  const maternalLabelY = useTransform(scrollYProgress, [0.04, 0.12], ["-40svh", "0svh"], {
    clamp: true,
  });
  const maternalLabelOpacity = useTransform(
    scrollYProgress,
    [0.032, 0.052, 0.5, 0.53],
    [0, 1, 1, 0],
  );
  const maternalNarrativeOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.145, 0.5, 0.53],
    [0, 1, 1, 0],
  );
  const fetalProgress = useTransform(scrollYProgress, [0.67, 0.9], [0, 1], { clamp: true });
  const fetalNarrativeY = useTransform(fetalProgress, (value) => -value * fetalNarrativeTravel);
  const fetalLabelY = useTransform(scrollYProgress, [0.54, 0.64], ["-40svh", "0svh"], {
    clamp: true,
  });
  const fetalLabelOpacity = useTransform(scrollYProgress, [0.53, 0.57, 1], [0, 1, 1], {
    clamp: true,
  });
  const fetalNarrativeOpacity = useTransform(scrollYProgress, [0.64, 0.67, 1], [0, 1, 1], {
    clamp: true,
  });
  const imageFrameScale = useTransform(smoothApproachProgress, [0, 1], [0.7, 1]);
  const imageFrameRadius = useTransform(smoothApproachProgress, [0, 1], ["150px", "0px"]);

  useEffect(() => {
    const maternalNarrative = maternalNarrativeRef.current;
    const fetalNarrative = fetalNarrativeRef.current;
    if (!maternalNarrative || !fetalNarrative) {
      return;
    }
    const measure = () => {
      setMaternalNarrativeTravel(
        Math.max(0, maternalNarrative.scrollHeight - window.innerHeight * 0.45),
      );
      setFetalNarrativeTravel(Math.max(0, fetalNarrative.scrollHeight - window.innerHeight * 0.3));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(maternalNarrative);
    observer.observe(fetalNarrative);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      className="section-seven-step-inside"
      ref={stageRef}
      aria-labelledby="step-inside-title"
    >
      <div className="section-seven-step-inside-copy">
        <h2 id="step-inside-title">Step Inside</h2>
        <p>The next generation of intelligence for pregnancy care.</p>
      </div>
      <div className="section-seven-step-inside-sticky">
        <m.figure
          aria-hidden="true"
          className="section-seven-intelligence-image-frame"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  borderTopLeftRadius: imageFrameRadius,
                  borderTopRightRadius: imageFrameRadius,
                  scale: imageFrameScale,
                }
          }
        >
          <picture>
            <source
              media="(max-width: 760px)"
              srcSet="/media/patient-step-inside-care-mobile-853x1844-v2.png"
            />
            <Image
              alt=""
              fill
              sizes="100vw"
              src="/media/patient-step-inside-care-desktop-1672x941-v2.png"
            />
          </picture>
        </m.figure>
        <m.h3
          className="section-seven-intelligence-label section-seven-maternal-intelligence-label"
          style={
            prefersReducedMotion ? undefined : { opacity: maternalLabelOpacity, y: maternalLabelY }
          }
        >
          Maternal Intelligence
        </m.h3>
        <m.div
          className="section-seven-intelligence-narrative section-seven-maternal-intelligence-narrative"
          ref={maternalNarrativeRef}
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: maternalNarrativeOpacity, y: maternalNarrativeY }
          }
        >
          {maternalIntelligenceTopics.map((topic) => (
            <article className="section-seven-intelligence-topic" key={topic.title}>
              <h3>{topic.title}</h3>
              {topic.sections.map((section) => (
                <div className="section-seven-intelligence-detail" key={section.label}>
                  <h4>{section.label}</h4>
                  <p>{section.copy}</p>
                </div>
              ))}
            </article>
          ))}
        </m.div>
        <m.h3
          className="section-seven-intelligence-label section-seven-fetal-intelligence-label"
          style={prefersReducedMotion ? undefined : { opacity: fetalLabelOpacity, y: fetalLabelY }}
        >
          Fetal Growth Intelligence
        </m.h3>
        <m.div
          className="section-seven-intelligence-narrative section-seven-fetal-intelligence-narrative"
          ref={fetalNarrativeRef}
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: fetalNarrativeOpacity, y: fetalNarrativeY }
          }
        >
          {fetalGrowthIntelligenceTopics.map((topic) => (
            <article className="section-seven-intelligence-topic" key={topic.title}>
              <h3>{topic.title}</h3>
              {topic.sections.map((section) => (
                <div className="section-seven-intelligence-detail" key={section.label}>
                  <h4>{section.label}</h4>
                  <p>{section.copy}</p>
                </div>
              ))}
            </article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
