'use client';

import { motion } from 'motion/react';

export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex overflow-hidden rounded-xl border border-stone-200 bg-white p-1 shadow-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <motion.button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            whileTap={{ scale: 0.97 }}
            className="relative flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all"
          >
            {isActive && (
              <motion.span
                layoutId="tabs-active-bg"
                className="absolute inset-0 rounded-lg bg-green-600 shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? 'text-white' : 'text-stone-600 hover:text-stone-800'}`}>
              {tab.icon && (
                <span className="mr-1.5 inline-block align-middle">{tab.icon}</span>
              )}
              <span className="align-middle">{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
