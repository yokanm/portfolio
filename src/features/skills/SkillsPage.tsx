import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Database, Settings, Shield } from 'lucide-react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { skillGroups, appliedSecuritySkills, conceptualSecuritySkills } from '@/data/portfolio';
import type { SkillGroup } from '@/types';

function CategoryIcon({ id }: { id: string }) {
  const size = 16;
  switch (id) {
    case 'frontend': return <Monitor size={size} />;
    case 'backend': return <Server size={size} />;
    case 'database': return <Database size={size} />;
    case 'tools': return <Settings size={size} />;
    case 'security': return <Shield size={size} />;
    default: return <Monitor size={size} />;
  }
}

const levelLabels: Record<string, { label: string; color: string }> = {
  core: { label: 'Core', color: 'var(--color-primary)' },
  proficient: { label: 'Proficient', color: 'var(--color-success)' },
  familiar: { label: 'Familiar', color: 'var(--color-on-surface-faint)' },
};

function SkillGrid({ group }: { group: SkillGroup }) {
  return (
    <motion.div key={group.id}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-outline-strong/5">
      {group.skills.map((skill, i) => {
        const level = skill.level ?? 'familiar';
        const meta = levelLabels[level];
        return (
          <motion.div key={skill.name}
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
            className="bg-background p-5 hover:bg-surface-dim group transition-colors">
            <div className="w-1.5 h-1.5 mb-3" style={{ background: meta.color }} />
            <h4 className="font-display font-bold text-sm uppercase text-on-surface leading-tight group-hover:text-primary transition-colors">
              {skill.name}
            </h4>
            <span className="font-mono text-[0.55rem] uppercase tracking-widest mt-1 block" style={{ color: meta.color }}>
              {meta.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function SkillsPage() {
  const [activeTab, setActiveTab] = useState(skillGroups[0].id);
  const activeGroup = skillGroups.find((g) => g.id === activeTab) ?? skillGroups[0];

  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <SectionTitle index="01" label="Skills" title="Technical Stack"
        description="The technologies, tools, and practices that power my work — organised by domain." />

      {/* Tabs */}
      <div className="mb-8 flex items-center gap-0 border-2 border-outline-strong/10 overflow-x-auto">
        {skillGroups.map((group) => (
          <button key={group.id} onClick={() => setActiveTab(group.id)}
            className={[
              'flex items-center gap-2 px-5 py-3.5 font-display text-[0.65rem] uppercase tracking-widest whitespace-nowrap transition-all duration-100 border-r border-outline-strong/10 last:border-0',
              activeTab === group.id
                ? 'bg-primary text-on-primary font-black'
                : 'text-on-surface-faint hover:text-on-surface hover:bg-outline-strong/5',
            ].join(' ')}>
            <CategoryIcon id={group.id} />
            {group.category.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Active group header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-xl uppercase text-on-surface">{activeGroup.category}</h3>
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mt-1">
            {activeGroup.skills.length} skills
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {Object.entries(levelLabels).map(([key, { label, color }]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5" style={{ background: color }} />
              <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <SkillGrid key={activeGroup.id} group={activeGroup} />
      </AnimatePresence>

      {/* Security */}
      <div className="mt-24">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary mb-3 block">
            02 — Security
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-on-surface leading-none">
            Cybersecurity
          </h2>
          <p className="font-body text-sm text-on-surface-faint mt-3 max-w-xl leading-relaxed">
            Skills acquired through the Google Cybersecurity Professional Certificate and applied
            throughout the software development lifecycle.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 border-l-4 border-primary bg-primary/5 px-6 py-4 mb-8">
          <Shield size={22} className="text-primary flex-shrink-0" />
          <div>
            <h4 className="font-display font-bold text-sm uppercase text-on-surface">
              Google Cybersecurity Professional Certificate
            </h4>
            <p className="font-mono text-[0.6rem] text-on-surface-faint uppercase tracking-widest mt-0.5">
              Coursera · Completed
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Code-verified implementations */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-primary" />
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-primary">
                Applied in code — repository-verifiable
              </span>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} className="flex flex-wrap gap-2">
              {appliedSecuritySkills.map((skill, i) => (
                <motion.span key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="font-mono text-[0.6rem] uppercase tracking-widest border border-primary/40 text-primary px-3 py-1.5 hover:border-primary hover:bg-primary/5 transition-all duration-100 cursor-default">
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Certificate — conceptual exposure */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-on-surface-subtle" />
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint">
                Google Cybersecurity Certificate — conceptual exposure, not in project code
              </span>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} className="flex flex-wrap gap-2">
              {conceptualSecuritySkills.map((skill, i) => (
                <motion.span key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="font-mono text-[0.6rem] uppercase tracking-widest border border-outline-strong/10 text-on-surface-faint px-3 py-1.5 hover:border-outline-strong/20 transition-all duration-100 cursor-default">
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* All skills overview */}
      <div className="mt-24">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-10">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary mb-3 block">
            03 — Overview
          </span>
          <h2 className="font-display font-black text-4xl uppercase text-on-surface leading-none">
            All Technologies
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.08 }}>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-outline-strong/10">
                <div className="text-primary"><CategoryIcon id={group.id} /></div>
                <h4 className="font-display font-bold text-xs uppercase text-on-surface tracking-wide">
                  {group.category.replace(' Development', '').replace(' & Cloud', '')}
                </h4>
              </div>
              <ul className="space-y-1.5">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="font-body text-xs text-on-surface-faint flex items-center gap-2">
                    <span className="w-1 h-1 flex-shrink-0"
                      style={{ background: levelLabels[skill.level ?? 'familiar'].color }} />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
