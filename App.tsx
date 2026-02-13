
import React, { useState, useMemo, useEffect } from 'react';
import { OCPP_DATA } from './data';
import { OperationCard } from './components/OperationCard';
import { AIAssistant } from './components/AIAssistant';
import { FeatureProfile } from './types';

const PROFILES: FeatureProfile[] = [
  'Core', 
  'Firmware Management', 
  'Local Auth List Management', 
  'Reservation', 
  'Smart Charging', 
  'Remote Trigger'
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'operations' | 'types' | 'config'>('intro');
  const [selectedProfile, setSelectedProfile] = useState<FeatureProfile | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Switch to operations tab when searching to show results
  useEffect(() => {
    if (searchQuery.trim() !== '' && activeTab !== 'operations') {
      setActiveTab('operations');
      setSelectedProfile('All');
    }
  }, [searchQuery]);

  const filteredOperations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return OCPP_DATA.operations.filter(op => {
      const matchesSearch = q === '' || 
                            op.title.toLowerCase().includes(q) ||
                            op.description.toLowerCase().includes(q) ||
                            op.messages.some(m => m.toLowerCase().includes(q));
      const matchesProfile = selectedProfile === 'All' || op.profile === selectedProfile;
      return matchesSearch && matchesProfile;
    });
  }, [searchQuery, selectedProfile]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-slate-900 text-white flex flex-col shrink-0 h-screen sticky top-0 z-40">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <i className="fas fa-plug text-lg"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none tracking-tight">OCPP 1.6</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Full Protocol Guide</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <button 
            onClick={() => { setActiveTab('intro'); setSelectedProfile('All'); setSearchQuery(''); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'intro' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <i className="fas fa-book-open w-5 text-center"></i>
            <span className="font-medium text-sm">Introduction</span>
          </button>
          
          <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Components</div>
          
          <button 
            onClick={() => { setActiveTab('operations'); setSelectedProfile('All'); setSearchQuery(''); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'operations' && selectedProfile === 'All' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <i className="fas fa-exchange-alt w-5 text-center"></i>
            <span className="font-medium text-sm">All Operations</span>
          </button>

          <div className="pl-6 space-y-1 mt-1 border-l border-slate-800 ml-6">
            {PROFILES.map(profile => (
              <button 
                key={profile}
                onClick={() => { setActiveTab('operations'); setSelectedProfile(profile); setSearchQuery(''); }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all ${activeTab === 'operations' && selectedProfile === profile ? 'text-indigo-400 bg-indigo-600/10' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className={`w-1 h-1 rounded-full ${activeTab === 'operations' && selectedProfile === profile ? 'bg-indigo-400' : 'bg-slate-700'}`}></div>
                {profile}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => { setActiveTab('types'); setSelectedProfile('All'); setSearchQuery(''); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mt-4 transition-all ${activeTab === 'types' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <i className="fas fa-brackets-curly w-5 text-center"></i>
            <span className="font-medium text-sm">Data Types & Enums</span>
          </button>
          
          <button 
            onClick={() => { setActiveTab('config'); setSelectedProfile('All'); setSearchQuery(''); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'config' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <i className="fas fa-sliders-h w-5 text-center"></i>
            <span className="font-medium text-sm">Config Keys</span>
          </button>
        </nav>

        <div className="p-6 text-[10px] text-slate-600 border-t border-slate-800 bg-slate-900/50">
          <p>© 2024 Open Charge Alliance</p>
          <p className="mt-1 flex items-center gap-1"><i className="fas fa-check-circle text-green-500/50"></i> JSON/WebSocket Compliant</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-10 lg:p-14 custom-scrollbar bg-[#f8fafc]">
        <header className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span>OCPP 1.6</span>
                <i className="fas fa-chevron-right text-[8px]"></i>
                <span className="text-indigo-600">{activeTab}</span>
                {selectedProfile !== 'All' && (
                  <>
                    <i className="fas fa-chevron-right text-[8px]"></i>
                    <span className="text-indigo-600">{selectedProfile}</span>
                  </>
                )}
              </nav>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                {searchQuery ? 'Search Results' : (
                  activeTab === 'intro' ? 'Protocol Architecture' : 
                  activeTab === 'operations' ? (selectedProfile === 'All' ? 'Operations Index' : selectedProfile) : 
                  activeTab.replace('-', ' ')
                )}
              </h2>
            </div>
            
            <div className="relative group">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"></i>
              <input 
                type="text" 
                placeholder="Search messages or keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl pl-12 pr-6 py-3.5 w-full md:w-96 focus:outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-sm text-sm"
              />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto pb-32">
          {activeTab === 'intro' && !searchQuery && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-700">
              {OCPP_DATA.introduction.map(section => (
                <div key={section.id} className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                    <i className={`fas ${section.id === 'intro' ? 'fa-info-circle' : section.id === 'transport' ? 'fa-network-wired' : 'fa-list-ul'} text-xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{section.content}</p>
                </div>
              ))}
              <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 rounded-3xl text-white shadow-xl">
                <div className="flex items-start gap-6">
                  <div className="hidden md:flex w-16 h-16 bg-white/20 rounded-2xl items-center justify-center shrink-0">
                    <i className="fas fa-shield-check text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Did you know?</h3>
                    <p className="text-indigo-100 leading-relaxed max-w-2xl">
                      OCPP 1.6 is the most widely deployed version of the protocol globally. It provides a robust foundation for interoperability between different hardware vendors and network operators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'operations' || searchQuery) && (
            <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
              {filteredOperations.length > 0 ? (
                filteredOperations.map(op => (
                  <OperationCard 
                    key={op.id} 
                    operation={op} 
                    messages={OCPP_DATA.messages.filter(m => op.messages.includes(m.id))}
                  />
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="text-slate-300 text-5xl mb-4"><i className="fas fa-search"></i></div>
                  <h3 className="text-xl font-bold text-slate-800">No results match your search</h3>
                  <p className="text-slate-500 mt-2">Try searching for core operations like "Authorize" or "StatusNotification".</p>
                  {selectedProfile !== 'All' && (
                    <button 
                      onClick={() => setSelectedProfile('All')}
                      className="mt-6 text-indigo-600 font-bold hover:underline"
                    >
                      Clear profile filter
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'types' && !searchQuery && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in fade-in duration-700">
              {OCPP_DATA.types.map((type, idx) => (
                <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">Enum/Type</div>
                    <h3 className="text-xl font-black text-slate-900 font-mono tracking-tighter">{type.name}</h3>
                  </div>
                  <p className="text-slate-500 mb-8 leading-relaxed italic border-l-4 border-indigo-100 pl-4">{type.description}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {type.values.map((v: any, vIdx: number) => (
                      <div key={vIdx} className="group flex flex-col gap-1 p-5 bg-slate-50 hover:bg-indigo-50/30 rounded-2xl transition-all border border-transparent hover:border-indigo-100">
                        <span className="text-sm font-bold text-slate-900 font-mono group-hover:text-indigo-600 transition-colors">{v.value}</span>
                        <span className="text-xs text-slate-500 leading-relaxed">{v.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'config' && !searchQuery && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-700">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-6">Key Name</th>
                      <th className="px-8 py-6">Data Type</th>
                      <th className="px-8 py-6 text-center">RW</th>
                      <th className="px-8 py-6">Purpose & Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {OCPP_DATA.configKeys.map((key, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/30 transition-all">
                        <td className="px-8 py-6">
                          <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg">{key.name}</span>
                        </td>
                        <td className="px-8 py-6 text-xs text-slate-400 font-medium">{key.type}</td>
                        <td className="px-8 py-6 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${key.accessibility === 'RW' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                            {key.accessibility}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-600 leading-relaxed font-medium">{key.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};

export default App;
