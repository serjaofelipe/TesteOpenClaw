import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal, Cpu, Heart, Briefcase, Code, Gamepad2, Shield } from 'lucide-react';
import './index.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function App() {
  return (
    <div>
      <div className="container">
        {/* HERO SECTION */}
        <section className="hero">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="hero-greeting mono">&gt; SYSTEM.INIT("Sérgio Felipe Agar Ribas Pinto")</p>
            <h1 className="hero-title">
              Full Stack Dev &<br />
              IoT Enthusiast.
            </h1>
            <p className="hero-subtitle">
              Criando sistemas impecáveis que conectam o mundo físico ao digital. Do Exército Brasileiro aos códigos da Organnact.
            </p>
          </motion.div>
          <div className="scroll-indicator">
            <span className="mono" style={{ fontSize: '0.8rem' }}>SCROLL</span>
            <ChevronDown size={24} />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="section">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Terminal /> Arquivo Pessoal
          </motion.h2>
          <div className="about-grid">
            <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p>
                Filho de Helena da Costa Agar e Sergio Ribas Pinto Junior, trilhei uma jornada de disciplina e superação.
                Ex-triatleta e atual praticante de Muay Thai, a disciplina moldada no esporte hoje me acompanha nas linhas de código.
              </p>
              <p>
                Compartilho a vida com o amor da minha vida, <strong>Ana Clara Indalencio Rocha da Silva</strong>, 
                e com o Caramelinho, um doguinho maluco e esperto. Guardo também no coração a saudade de Babi, Tobias e Lassie.
              </p>
              
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-value">23</div>
                  <div className="stat-label">Anos de Idade</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">1.4 TB</div>
                  <div className="stat-label">Storage Mestre</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
               <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                 <Heart size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>O Homem Mais Feliz</h3>
                 <p style={{ color: 'var(--text-muted)' }}>
                   "Sou um homem muito feliz. Tenho uma família que me apoia, a mulher dos meus sonhos, meu cachorro e um trabalho que eu amo."
                 </p>
               </div>
            </motion.div>
          </div>
        </section>

        {/* CAREER TIMELINE */}
        <section className="section">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Briefcase /> Formação & Carreira
          </motion.h2>
          
          <div className="timeline">
            <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Organnact</h3>
                <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Atual</p>
                <p>Desenvolvedor Full Stack, construindo sistemas e escalando o futuro tecnológico da gigante de suplementos animais.</p>
              </div>
            </motion.div>
            
            <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>PUC PR</h3>
                <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Ensino Superior</p>
                <p>Análise e Desenvolvimento de Sistemas. Transformando café e madrugadas em arquiteturas robustas.</p>
              </div>
            </motion.div>

            <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Exército Brasileiro</h3>
                <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Parque Regional de Manutenção 5</p>
                <p>Honra, dever e trabalho em equipe. Aos 19 anos, aprendi o verdadeiro valor da disciplina militar.</p>
              </div>
            </motion.div>

            <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Colégio da Polícia Militar do Paraná</h3>
                <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Ensino Fundamental e Médio</p>
                <p>Do 6º ao 3º ano. Formação de caráter inabalável sob forte disciplina e valores sólidos.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS & ARSENAL */}
        <section className="section">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Code /> Projetos & Engenharia
          </motion.h2>
          
          <div className="grid">
            <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="card-icon"><Cpu /></div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Hardware & IoT (ESP32)</h3>
              <p style={{ color: 'var(--text-muted)' }}>Amante da automação e sistemas embarcados. Unindo as engrenagens de software aos chips e sensores do mundo físico.</p>
              <div className="tag-list">
                <span className="tag">C++</span>
                <span className="tag">Microcontrollers</span>
                <span className="tag">Sensors</span>
              </div>
            </motion.div>

            <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="card-icon"><Shield /></div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Aplicações Core</h3>
              <p style={{ color: 'var(--text-muted)' }}>Desenvolvimento do App da URBS (consumo avançado de APIs), integração com API da NASA e sistemas complexos de Gestão Financeira.</p>
              <div className="tag-list">
                <span className="tag">React</span>
                <span className="tag">Python</span>
                <span className="tag">APIs REST</span>
              </div>
            </motion.div>

            <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="card-icon"><Gamepad2 /></div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Sala de Troféus</h3>
              <p style={{ color: 'var(--text-muted)' }}>Quando o IDE fecha, o foco vai para <strong>God of War</strong> (favorito) e as partidas clássicas de <strong>Call of Duty: BO2</strong>.</p>
              <div className="tag-list">
                <span className="tag">Valorant</span>
                <span className="tag">CS:GO</span>
                <span className="tag">Overwatch</span>
              </div>
            </motion.div>
          </div>
        </section>
        
        <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
          <p className="mono">© 2026 // SYSTEM.OWNER = "Sérgio Felipe Agar Ribas Pinto"</p>
        </footer>
      </div>
    </div>
  );
}
