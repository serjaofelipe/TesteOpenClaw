import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, CheckCircle, XCircle, Users, Navigation, AlertTriangle } from 'lucide-react';
import './index.css';

const INITIAL_PASSENGERS = [
  { id: 1, name: 'Lucas Silva', address: 'Rua das Flores, 123', paid: true, present: true },
  { id: 2, name: 'Mariana Costa', address: 'Av. Paulista, 900', paid: true, present: true },
  { id: 3, name: 'Pedro Souza', address: 'Rua Augusta, 45', paid: false, present: true },
  { id: 4, name: 'Ana Oliveira', address: 'Al. Santos, 321', paid: true, present: false },
  { id: 5, name: 'João Mendes', address: 'Av. Brigadeiro, 500', paid: false, present: true },
];

export default function App() {
  const [passengers, setPassengers] = useState(INITIAL_PASSENGERS);

  const togglePresence = (id) => {
    setPassengers(passengers.map(p => p.id === id ? { ...p, present: !p.present } : p));
  };

  const togglePayment = (id) => {
    setPassengers(passengers.map(p => p.id === id ? { ...p, paid: !p.paid } : p));
  };

  const presentCount = passengers.filter(p => p.present).length;
  const pendingPayments = passengers.filter(p => !p.paid).length;

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <Bus size={28} />
          <span>Grupo da Van</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="avatar" style={{ width: '35px', height: '35px', fontSize: '0.8rem' }}>ZÉ</div>
          <span style={{ fontWeight: '600' }}>Seu Zé (Motorista)</span>
        </div>
      </nav>

      <main className="main-content">
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title"><Users size={24} /> Lista de Passageiros</h2>
            <span style={{ color: 'var(--text-muted)' }}>{presentCount} / {passengers.length} presentes</span>
          </div>

          <div className="passenger-list">
            {passengers.map((p) => (
              <motion.div 
                key={p.id}
                className={`passenger-card ${!p.present ? 'absent' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="passenger-info">
                  <div className="avatar">{p.name.charAt(0)}</div>
                  <div className="details">
                    <h3>{p.name} {(!p.present) && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>(Faltou)</span>}</h3>
                    <p><MapPin size={14} /> {p.address}</p>
                  </div>
                </div>
                
                <div className="actions">
                  <button 
                    onClick={() => togglePayment(p.id)}
                    className={`badge ${p.paid ? 'paid' : 'pending'}`}
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    {p.paid ? <><CheckCircle size={14} /> Pago</> : <><AlertTriangle size={14} /> Pendente</>}
                  </button>
                  <button 
                    onClick={() => togglePresence(p.id)}
                    className="badge"
                    style={{ background: 'var(--bg-dark)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                  >
                    {p.present ? 'Marcar Falta' : 'Marcar Presença'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="panel">
            <h2 className="panel-title" style={{ marginBottom: '1rem' }}>Resumo do Dia</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">{presentCount}</div>
                <div className="stat-label">Embarques Hoje</div>
              </div>
              <div className="stat-box">
                <div className="stat-value" style={{ color: pendingPayments > 0 ? 'var(--danger)' : 'var(--success)' }}>
                  {pendingPayments}
                </div>
                <div className="stat-label">Inadimplentes</div>
              </div>
            </div>
            
            <button className="btn">
              <Navigation size={20} />
              Iniciar Rota no Maps
            </button>
          </div>

          <div className="panel" style={{ flex: 1 }}>
            <h2 className="panel-title" style={{ marginBottom: '1rem' }}><AlertTriangle size={20} color="var(--primary)" /> Avisos</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              - O pneu traseiro foi calibrado ontem.<br/><br/>
              - Lembrete: Enviar comprovante de manutenção para a cooperativa até sexta-feira.<br/><br/>
              - {pendingPayments} alunos ainda não pagaram a mensalidade deste mês.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
