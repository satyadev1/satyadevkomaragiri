import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skills as data } from '../data/resumeData';

const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const HYSTERESIS = 0.18;

const categories = [
  { key: 'backend', label: 'Backend', barClass: 'bg-accent' },
  { key: 'cloudDevOps', label: 'Cloud & DevOps', barClass: 'bg-accent-soft' },
  { key: 'frontend', label: 'Frontend', barClass: 'bg-accent-soft' },
  { key: 'data', label: 'Data', barClass: 'bg-accent-soft' },
  { key: 'ai', label: 'AI', barClass: 'bg-accent' },
  { key: 'methodologies', label: 'Methodologies', barClass: 'bg-accent-soft' },
];

const skillLogos = {
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'Spring MVC': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  Hibernate: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Fast API': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  JUnit: 'https://cdn.simpleicons.org/junit5',
  Gradle: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg',
  'Google Cloud Platform (GCP)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  Kubernetes: 'https://cdn.simpleicons.org/kubernetes',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  Helm: 'https://cdn.simpleicons.org/helm',
  Terraform: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
  Kibana: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kibana/kibana-original.svg',
  'React JS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  jQuery: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
  'Vanilla JS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  D3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-plain.svg',
  'Microsoft SQL Server': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  'Oracle DB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
  'Pinecone DB': 'https://www.google.com/s2/favicons?domain=pinecone.io&sz=128',
  'Crew AI': 'https://cdn.prod.website-files.com/69a111972d2e0bbcc6adb934/69a111972d2e0bbcc6adb95b_CrewAi%20icon%20-%20border.svg',
  'Embed Chain': 'https://www.google.com/s2/favicons?domain=embedchain.ai&sz=128',
  'GitLab CI/CD': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
};

const skillLogoFallbacks = {
  'Pinecone DB': 'https://icon.horse/icon/pinecone.io',
  'Crew AI': 'https://www.google.com/s2/favicons?domain=crewai.com&sz=128',
  'Embed Chain': 'https://icon.horse/icon/embedchain.ai',
};

export function Skills() {
  const sectionRef = useRef(null);
  const ratiosRef = useRef({});
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let unobserve = () => {};
    const timeoutId = setTimeout(() => {
      const cards = section.querySelectorAll('[data-skill-index]');
      if (cards.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = entry.target.getAttribute('data-skill-index');
            if (idx != null) ratiosRef.current[idx] = entry.intersectionRatio;
          });
          const ratios = { ...ratiosRef.current };
          let bestIndex = -1;
          let bestRatio = 0.01;
          Object.keys(ratios).forEach((key) => {
            const r = ratios[key];
            if (typeof r === 'number' && r > bestRatio) {
              bestRatio = r;
              bestIndex = parseInt(key, 10);
            }
          });
          const current = activeIndexRef.current;
          const currentRatio = typeof ratios[current] === 'number' ? ratios[current] : 0;
          if (bestIndex >= 0 && bestIndex !== current && bestRatio < currentRatio + HYSTERESIS) {
            bestIndex = current;
          }
          if (bestIndex >= 0) {
            activeIndexRef.current = bestIndex;
            setActiveIndex(bestIndex);
          }
        },
        { root: null, rootMargin: '0px', threshold: THRESHOLDS }
      );

      cards.forEach((el) => observer.observe(el));
      unobserve = () => cards.forEach((el) => observer.unobserve(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      unobserve();
    };
  }, [categories.length]);

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen flex flex-col justify-center py-28 px-6 content-overlay relative">
        <motion.h2
        className="font-display text-3xl md:text-4xl font-semibold text-overlay-heading text-center mb-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Technical expertise
      </motion.h2>
      <motion.p
        className="text-overlay-muted text-center mb-16 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Technologies and practices I work with
      </motion.p>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          (() => {
            const isHighlighted = i === activeIndex;
            return (
          <motion.div
            key={cat.key}
            data-skill-index={i}
            className={`glass-card group p-6 rounded-2xl transition-all duration-300 border-l-4 border-l-accent ${
              isHighlighted
                ? 'active-glow-card card-glow'
                : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            animate={{ scale: isHighlighted ? 1.02 : 1, transition: { type: 'spring', stiffness: 300, damping: 28 } }}
            whileHover={{ y: -2 }}
          >
            <div className={`w-10 h-0.5 rounded-full ${cat.barClass} mb-5`} />
            <h3 className={`font-display text-lg font-medium mb-4 ${isHighlighted ? 'highlight-text' : 'text-overlay-heading hover-highlight-text'}`}>
              {cat.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {data[cat.key]?.map((skill, j) => (
                <motion.li
                  key={skill}
                  className={`skill-pill ${isHighlighted ? 'skill-pill-highlighted' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {skillLogos[skill] ? (
                    <img
                      src={skillLogos[skill]}
                      alt=""
                      className="skill-pill-icon"
                      onError={(e) => {
                        const fallback = skillLogoFallbacks[skill];
                        if (fallback && e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                          return;
                        }
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className={`${
                    isHighlighted
                      ? 'highlight-text'
                      : 'text-overlay-text'
                  }`}>{skill}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
            );
          })()
        ))}
      </div>
    </section>
  );
}
