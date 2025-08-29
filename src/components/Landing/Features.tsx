import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, Users, Activity, Lock, Globe } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Secure Upload',
    description: 'Encrypted file uploads with blockchain hash generation for tamper-proof storage.',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    title: 'Role-based Access',
    description: 'Granular permissions for admins, verifiers, and users with audit trails.',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: Activity,
    title: 'Blockchain Audit Trail',
    description: 'Complete transparency with immutable verification history and timestamps.',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: Shield,
    title: 'Document Integrity',
    description: 'Advanced cryptographic verification ensures documents remain unaltered.',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Military-grade encryption and security protocols for sensitive documents.',
    gradient: 'from-red-500 to-red-600'
  },
  {
    icon: Globe,
    title: 'Global Verification',
    description: 'Instant verification from anywhere in the world with real-time status updates.',
    gradient: 'from-orange-500 to-orange-600'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Document Security
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Revolutionary blockchain technology meets intuitive design to create the most secure 
            document verification platform available.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}