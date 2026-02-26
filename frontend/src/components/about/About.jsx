import React from 'react';
import { 
  Heart, 
  Users, 
  Shield, 
  Award, 
  Target,
  Droplet,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import Footer from '../Footer';
import Header from '../Header';

const AboutUs = () => {
  const stats = [
    { icon: Users, number: '50,000+', label: 'Lives Saved' },
    { icon: Droplet, number: '100,000+', label: 'Donations' },
    { icon: MapPin, number: '500+', label: 'Camps Organized' },
    { icon: Shield, number: '99.8%', label: 'Safety Rate' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and the impact one person can make in saving lives.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every donation follows strict medical protocols ensuring donor safety and blood quality.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building strong communities where people help each other in times of need.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to maintaining the highest standards in blood collection and distribution.'
    }
  ];

  const team = [
    {
      name: 'N Raghavendra',
      role: 'Backend & Database Manager',
      image: '/assets/raghavendra.jpg',
      bio: 'Ensuring secure and robust system architecture for data management'
    },
    {
      name: 'G Shashank',
      role: 'Frontend Specialist',
      image: '/assets/shashank.png',
      bio: 'Designing user-friendly platforms to connect donors and patients'
    },
    {
      name: 'B Dinish',
      role: 'Developer & Innovator',
      image: '/assets/dinish.png',
      bio: 'Passionate about creating technical solutions for healthcare'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Header />
      {/* Mission & Vision */}
      <section className="py-20 mt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About HemoLink</h2>
              <p className="text-lg text-gray-700 mb-6">
                HemoLink is a web-based platform designed to connect blood donors, recipients, and blood banks in real time.
              </p>
              <p className="text-lg text-gray-700">
                The system manages donor registration, blood availability tracking, emergency requests, and inventory monitoring efficiently.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Core Purpose</h3>
              <div className="bg-red-50 p-6 rounded-lg">
                <Target className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Efficiency & Accuracy</h4>
                <p className="text-gray-700">
                  It aims to reduce the time taken to find blood during emergencies and maintain accurate blood stock records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and define who we are
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-red-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
                  <value.icon className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We are students dedicated to making a difference in healthcare
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-r from-red-400 to-red-600 relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
