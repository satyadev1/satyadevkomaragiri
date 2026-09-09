import { motion } from 'framer-motion';
import { skills as data } from '../data/resumeData';

const categories = [
  { key: 'backend', label: 'Backend systems', code: 'BE' },
  { key: 'cloudDevOps', label: 'Cloud & delivery', code: 'CD' },
  { key: 'frontend', label: 'Product interfaces', code: 'UI' },
  { key: 'data', label: 'Data platforms', code: 'DB' },
  { key: 'ai', label: 'AI engineering', code: 'AI' },
  { key: 'methodologies', label: 'Engineering practice', code: 'DX' },
];

const skillLogos = {
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'Spring MVC': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  Hibernate: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  FastAPI: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  Gradle: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg',
  'Google Cloud Platform (GCP)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  Kubernetes: 'https://cdn.simpleicons.org/kubernetes',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  Helm: 'https://cdn.simpleicons.org/helm',
  Terraform: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
  Kibana: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kibana/kibana-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  jQuery: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
  'Vanilla JS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  D3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-plain.svg',
  'Microsoft SQL Server': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  'Oracle DB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
  Pinecone: 'https://www.google.com/s2/favicons?domain=pinecone.io&sz=128',
  CrewAI: 'https://www.google.com/s2/favicons?domain=crewai.com&sz=128',
  Embedchain: 'https://www.google.com/s2/favicons?domain=embedchain.ai&sz=128',
  'GitLab CI/CD': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
};

export function Skills() {
  return (
    <section id="skills" className="portfolio-section content-overlay">
      <div className="portfolio-shell">
        <motion.div
          className="section-intro-row"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="section-intro compact">
            <span className="section-eyebrow">06 / Technical toolkit</span>
            <h2>Tools chosen for the problem.</h2>
          </div>
          <p>A broad working set across JVM platforms, AI systems, cloud delivery, data, and product interfaces.</p>
        </motion.div>

        <div className="skill-section-grid">
          {categories.map((category, index) => (
            <motion.article
              className="skill-group"
              key={category.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="skill-group-title">
                <span>{category.code}</span>
                <h3>{category.label}</h3>
              </div>
              <div className="skill-tags">
                {data[category.key]?.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skillLogos[skill] ? (
                      <img src={skillLogos[skill]} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                    ) : null}
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
