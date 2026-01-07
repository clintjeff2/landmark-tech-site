"use client";

import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  preserveValue?: boolean;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  preserveValue = false,
}: UseCountUpOptions) {
  const [count, setCount] = useState(preserveValue ? end : start);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsInView(true);
            hasAnimated.current = true;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const change = endValue - startValue;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + change * easeOut;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, start, end, duration]);

  const formatNumber = (value: number): string => {
    const fixed = value.toFixed(decimals);
    const parts = fixed.split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    const decimalPart = parts[1] ? `.${parts[1]}` : "";
    return `${prefix}${integerPart}${decimalPart}${suffix}`;
  };

  return {
    ref: elementRef,
    value: formatNumber(count),
    rawValue: count,
  };
}

// Specialized hook for parsing and animating complex stat values
export function useStatCounter(value: string, duration = 2000) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const [isInView, setIsInView] = useState(false);
  const hasAnimated = useRef(false);

  // Parse the value to extract numbers, prefixes, and suffixes
  const parseValue = (val: string) => {
    // Handle percentages
    if (val.includes("%")) {
      const num = parseFloat(val.replace(/[^0-9.]/g, ""));
      return { number: num, prefix: "", suffix: "%", decimals: 0 };
    }

    // Handle currency
    if (val.includes("$")) {
      const cleanVal = val.replace(/[$,]/g, "");
      let suffix = "";
      let number = 0;

      if (cleanVal.includes("K")) {
        number = parseFloat(cleanVal.replace("K", "")) * 1000;
        suffix = "K+";
      } else if (cleanVal.includes("M")) {
        number = parseFloat(cleanVal.replace("M", "")) * 1000000;
        suffix = "M+";
      } else {
        number = parseFloat(cleanVal);
      }

      return { number, prefix: "$", suffix, decimals: 0 };
    }

    // Handle numbers with K, M suffixes
    if (val.includes("K") || val.includes("M")) {
      const cleanVal = val.replace(/[,+]/g, "");
      let suffix = "+";
      let number = 0;

      if (cleanVal.includes("K")) {
        number = parseFloat(cleanVal.replace("K", "")) * 1000;
        suffix = "K+";
      } else if (cleanVal.includes("M")) {
        number = parseFloat(cleanVal.replace("M", "")) * 1000000;
        suffix = "M+";
      }

      return { number, prefix: "", suffix, decimals: 0 };
    }

    // Handle plain numbers with commas
    const cleanVal = val.replace(/[,+]/g, "");
    const number = parseFloat(cleanVal);
    const hasPlus = val.includes("+");

    return {
      number,
      prefix: "",
      suffix: hasPlus ? "+" : "",
      decimals: 0,
    };
  };

  const { number, prefix, suffix, decimals } = parseValue(value);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsInView(true);
            hasAnimated.current = true;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = number;
    const change = endValue - startValue;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + change * easeOut;

      // Format the number
      let formattedNumber;
      if (suffix.includes("K")) {
        formattedNumber = (currentValue / 1000).toFixed(decimals);
      } else if (suffix.includes("M")) {
        formattedNumber = (currentValue / 1000000).toFixed(decimals);
      } else {
        formattedNumber = Math.floor(currentValue)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Set final value
        let finalNumber;
        if (suffix.includes("K")) {
          finalNumber = (endValue / 1000).toFixed(decimals);
        } else if (suffix.includes("M")) {
          finalNumber = (endValue / 1000000).toFixed(decimals);
        } else {
          finalNumber = Math.floor(endValue)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        setDisplayValue(`${prefix}${finalNumber}${suffix}`);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, number, prefix, suffix, decimals, duration]);

  return {
    ref: elementRef,
    value: displayValue,
  };
}
