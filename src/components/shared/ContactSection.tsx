'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import ContactCTA from './ContactCTA';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-3xl mx-auto"
        style={{ borderRadius: '0.75rem' }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          ) : (
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactCTA onSendMessageClick={() => setShowForm(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}