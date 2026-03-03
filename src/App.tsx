/*
ESTRUTURA DO PROJETO — GITHUB
/
├── index.html
├── /assets
│   ├── /images
│   │   ├── logo.png          ← logotipo do cabeçalho
│   │   ├── hero-profissional.png   ← foto do profissional no Hero
│   │   ├── sofa-antes-depois.png
│   │   ├── colchao-antes-depois.png
│   │   ├── tapete-antes-depois.png
│   │   ├── poltrona-antes-depois.png
│   │   ├── cadeiras-antes-depois.png
│   │   ├── couro-antes-depois.png
│   │   ├── pet-sofa.png            ← foto da seção Pet Friendly
│   │   └── condominio.png          ← foto da seção Condomínios
*/
import { useState, useEffect, useCallback } from 'react';
import { 
  MessageCircle, 
  Instagram, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  Star, 
  Zap, 
  Home, 
  ShieldCheck, 
  Clock, 
  Droplets,
  Calendar,
  Phone,
  Menu,
  X,
  Sofa,
  Bed,
  Waves,
  Building2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';

const WHATSAPP_URL = "https://wa.me/5566997170914";
const INSTAGRAM_URL = "https://instagram.com/odoutorlimpeza";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [googleReviews, setGoogleReviews] = useState<any[]>([]);
  const [googleRating, setGoogleRating] = useState<number>(5.0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          if (data.reviews && data.reviews.length > 0) {
            setGoogleReviews(data.reviews);
            setGoogleRating(data.rating);
            setTotalRatings(data.total_ratings);
          }
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    }
    fetchReviews();
  }, []);

  const testimonials = googleReviews.length > 0 ? googleReviews.map(r => ({
    name: r.author_name,
    text: r.text,
    date: r.relative_time_description,
    rating: r.rating,
    photo: r.profile_photo_url
  })) : [
    { name: "Carlos Adyr", text: "Excelente serviço e profissionais de confiança", date: "há 2 meses", rating: 5 },
    { name: "Charllene Castro", text: "Comprometidos, pontuais e serviço de qualidade.", date: "há 1 mês", rating: 5 },
    { name: "Filipe Natã", text: "Profissionais de excelência. Ótimo atendimento e limpeza do sofá impecável. Recomendo.", date: "há 3 semanas", rating: 5 },
    { name: "Rafael Priori", text: "Equipe pontual, muito atento aos detalhes para deixar o sofá o mais limpo possível! Recomendo", date: "há 2 meses", rating: 5 },
    { name: "Juliano Gaio", text: "Serviço extremamente profissional com pessoas capacitadas e muito atenciosas, recomendo!", date: "há 4 meses", rating: 5 },
    { name: "Claudia Arruda", text: "O profissional foi muito simpático e caprichoso. Gostei muito do resultado.", date: "há 5 meses", rating: 5 },
    { name: "Michele Leal", text: "Excelente profissionalismo e de confiança", date: "há 1 ano", rating: 5 },
  ];

  const services = [
    { 
      title: "Higienização de Sofás", 
      icon: <Sofa className="w-8 h-8" />,
      desc: "Limpeza profunda com extração de sujeiras, manchas e odores acumulados. Eliminamos ácaros, bactérias e fungos e aplicamos camada protetora que dura até 3 meses."
    },
    { 
      title: "Poltronas e Cadeiras", 
      icon: <Sofa className="w-8 h-8" />,
      desc: "Higienização completa de todos os tipos de tecido e couro, removendo gordura corporal, pelos de pet e micro-organismos invisíveis que comprometem sua saúde."
    },
    { 
      title: "Colchões", 
      icon: <Bed className="w-8 h-8" />,
      desc: "Aspiração a seco, higienização profunda e desinfecção completa. Com nossa tecnologia Seca Turbo, entregamos seu colchão limpo, seco e pronto para uso no mesmo dia."
    },
    { 
      title: "Tapetes", 
      icon: <Waves className="w-8 h-8" />,
      desc: "Retiramos, higienizamos e entregamos. Removemos poeira, ácaros, manchas e odores profundos com escovação técnica, extração completa e proteção final."
    },
    { 
      title: "Condomínios", 
      icon: <Building2 className="w-8 h-8" />,
      desc: "Atendimento especializado para moradores e administradores, com logística prática, agendamento coletivo e condições especiais para grupos de moradores."
    },
    { 
      title: "Impermeabilização", 
      icon: <ShieldCheck className="w-8 h-8" />,
      desc: "Aplicamos uma barreira invisível que protege seus estofados contra líquidos, manchas e desgaste diário, sem alterar textura, cor ou aparência do tecido."
    },
  ];

  const differentials = [
    { title: "Tecnologia SECA TURBO", desc: "Seu estofado fica limpo e seco no mesmo dia. Sem esperar dias para usar de novo.", icon: <Zap className="text-orange-500" /> },
    { title: "Atendimento em Domicílio", desc: "A gente vai até a sua casa. Você não precisa sair com nada.", icon: <Home className="text-blue-600" /> },
    { title: "Produtos Seguros", desc: "Biodegradáveis, sem cheiro forte e seguros para crianças e pets.", icon: <ShieldCheck className="text-green-600" /> },
    { title: "Pontualidade", desc: "Avisamos antes de chegar e respeitamos o seu horário.", icon: <Clock className="text-blue-500" /> },
  ];

  const steps = [
    { title: "Contato", desc: "Manda uma foto pelo WhatsApp e recebe o orçamento na hora, sem enrolação.", icon: <MessageCircle /> },
    { title: "Agendamento", desc: "Você escolhe o dia e o horário que encaixar melhor na sua rotina.", icon: <Calendar /> },
    { title: "Higienização", desc: "Nossa equipe vai até você, faz tudo com capricho e entrega o estofado limpo e seco.", icon: <Droplets /> },
  ];

  const faqs = [
    { q: "Quanto tempo demora em média o serviço?", a: "O tempo pode variar dependendo da sujidade do seu estofado. Repetimos o processo até a água extraída sair limpa. Em média, o serviço leva de 2 a 3 horas." },
    { q: "O estofado fica molhado?", a: "Não. Entregamos o estofado 95% seco. Após algumas horas de descanso, ele já poderá ser utilizado." },
    { q: "Quanto tempo depois posso usar o estofado?", a: "Recomendamos um período de 6 a 8 horas para garantir que esteja completamente seco. O cliente também pode tocar no tecido para verificar se já está pronto para uso." },
    { q: "Os produtos utilizados são seguros?", a: "Sim! Utilizamos produtos biodegradáveis e seguros, que não causam danos à saúde nem ao meio ambiente." },
    { q: "O serviço remove manchas difíceis?", a: "Fazemos o possível para remover manchas, mas o resultado pode depender do tipo de tecido e do tempo que a mancha está presente." },
    { q: "Higienizar o estofado elimina ácaros e bactérias?", a: "Sim! Nosso processo inclui desinfecção completa, eliminando ácaros, bactérias e fungos." },
    { q: "Preciso preparar algo antes da higienização?", a: "Apenas certifique-se de que o estofado esteja acessível e livre de objetos pessoais." },
    { q: "A higienização tem cheiro forte?", a: "Não. Os produtos usados possuem fragrância suave e agradável, que desaparece em pouco tempo." },
    { q: "Vocês atendem condomínios?", a: "Sim! Oferecemos atendimento prático e seguro diretamente no seu condomínio, com condições especiais para grupos de moradores." },
    { q: "Quanto tempo dura a proteção aplicada?", a: "A barreira protetora contra ácaros, bactérias e fungos dura até 3 meses." },
    { q: "Quais tipos de estofados vocês higienizam?", a: "Realizamos higienização de sofás, poltronas, cadeiras, colchões e tapetes." },
    { q: "Como faço para agendar o serviço?", a: "É fácil! Entre em contato conosco pelo WhatsApp para solicitar um orçamento e escolher a melhor data e horário." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <img 
                src="assets/images/logo.png" 
                alt="O Doutor Limpeza" 
                style={{ height: '48px', width: 'auto' }}
                className="block"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl leading-none text-blue-900 uppercase tracking-tight">O Doutor Limpeza</span>
                <span className="text-[10px] sm:text-xs text-blue-600 font-medium tracking-widest uppercase">Nossa família cuida da sua</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#servicos" className="text-sm font-medium hover:text-blue-600 transition-colors">Serviços</a>
              <a href="#diferenciais" className="text-sm font-medium hover:text-blue-600 transition-colors">Diferenciais</a>
              <a href="#faq" className="text-sm font-medium hover:text-blue-600 transition-colors">Dúvidas</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Orçamento Grátis
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Serviços</a>
                <a href="#diferenciais" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Diferenciais</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Dúvidas</a>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="bg-blue-600 text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Agendar pelo WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 overflow-hidden bg-blue-950 text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-800 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-900/50 rounded-full border border-blue-800">
                Higienização Profissional em Rondonópolis
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
                Estofado limpo e seco <br />
                <span className="text-blue-400">no mesmo dia.</span>
              </h1>
              <p className="max-w-2xl mx-auto lg:mx-0 text-lg sm:text-xl text-blue-100/80 mb-10 leading-relaxed">
                Especialistas em tecnologia <span className="font-bold text-orange-400 italic">SECA TURBO</span>. 
                Eliminamos ácaros, fungos e sujeiras profundas com produtos seguros para sua família.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-950/50 flex items-center justify-center gap-3 group">
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Agendar pelo WhatsApp
                </a>
                <a href="#servicos" className="w-full sm:w-auto px-8 py-4 rounded-2xl text-lg font-bold text-white/80 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  Conhecer Serviços
                  <ChevronDown className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="aspect-[4/5] bg-blue-900/30 rounded-[3rem] overflow-hidden border border-white/10 relative">
                <img 
                  src="assets/images/hero-profissional.png" 
                  alt="Profissional O Doutor Limpeza" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-60"></div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold">Garantia de Qualidade</div>
                    <div className="text-slate-500 text-sm">Satisfação 100%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-2">+500</div>
              <p className="text-slate-500 text-sm font-medium">clientes atendidos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-2">5.0</div>
              <p className="text-slate-500 text-sm font-medium">no Google ⭐</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-2">3 meses</div>
              <p className="text-slate-500 text-sm font-medium">de proteção</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-2">99,9%</div>
              <p className="text-slate-500 text-sm font-medium">de eliminação de microrganismos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Soluções completas para manter sua casa saudável e seus estofados como novos.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Veja a transformação com seus próprios olhos</h2>
            <p className="text-slate-600">Resultados reais de clientes reais em Rondonópolis</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { label: "SOFÁ", color: "bg-blue-500", img: "sofa-antes-depois.png" },
              { label: "COLCHÃO", color: "bg-orange-500", img: "colchao-antes-depois.png" },
              { label: "TAPETE", color: "bg-green-500", img: "tapete-antes-depois.png" },
              { label: "POLTRONA", color: "bg-purple-500", img: "poltrona-antes-depois.png" },
              { label: "CADEIRAS", color: "bg-teal-500", img: "cadeiras-antes-depois.png" },
              { label: "COURO", color: "bg-amber-600", img: "couro-antes-depois.png" }
            ].map((item, idx) => (
              <div key={idx} className="aspect-video bg-slate-100 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group">
                <div className={`absolute top-4 left-4 ${item.color} text-white text-[10px] font-bold px-3 py-1 rounded-full z-10`}>
                  {item.label}
                </div>
                <img 
                  src={`assets/images/${item.img}`} 
                  alt={`${item.label} antes e depois`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 -z-10">
                  <Instagram className="w-8 h-8 text-slate-300 opacity-20" />
                  <span className="text-slate-400 text-sm font-medium">📷 Antes e Depois</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
            >
              <Instagram className="w-5 h-5" />
              Ver mais no Instagram @odoutorlimpeza
            </a>
          </div>
        </div>
      </section>
      <section id="diferenciais" className="py-20 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Por que escolher <br /><span className="text-blue-400">O Doutor Limpeza?</span></h2>
              <div className="space-y-8">
                {differentials.map((diff, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center border border-blue-800">
                      {diff.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{diff.title}</h4>
                      <p className="text-blue-100/70">{diff.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-blue-600 relative">
                <img 
                  src="https://picsum.photos/seed/cleaning/800/800" 
                  alt="Limpeza de sofá" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-white">
                    <div className="text-5xl font-black mb-2 italic">SECA TURBO</div>
                    <p className="text-lg font-medium opacity-90">Sua família não precisa esperar dias para usar o sofá novamente.</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-2xl shadow-2xl rotate-3">
                <div className="text-sm font-bold uppercase tracking-wider mb-1">Proteção Ativa</div>
                <div className="text-2xl font-black">Até 3 Meses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Friendly Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Tem pet em casa? A gente cuida disso.</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Pelos, odores e resíduos do dia a dia dos seus animais se acumulam nos estofados sem que você perceba. 
                Nossa higienização remove tudo isso com produtos 100% seguros para cães, gatos e crianças.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 flex items-center gap-2">
                  🐶 Seguro para pets
                </div>
                <div className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 flex items-center gap-2">
                  👶 Seguro para crianças
                </div>
                <div className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 flex items-center gap-2">
                  🌿 Biodegradável
                </div>
              </div>
            </div>
            <div className="aspect-square lg:aspect-video bg-slate-200 rounded-[2.5rem] flex items-center justify-center text-slate-400 relative overflow-hidden">
              <img 
                src="assets/images/pet-sofa.png" 
                alt="Pet no sofá" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center -z-10">
                <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center">
                  <Sofa className="w-10 h-10 opacity-30" />
                </div>
                <span className="font-bold uppercase tracking-widest text-xs">Foto Pet Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Condomínios Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 aspect-square lg:aspect-video bg-slate-200 rounded-[2.5rem] flex items-center justify-center text-slate-400 relative overflow-hidden">
              <img 
                src="assets/images/condominio.png" 
                alt="Condomínio" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center -z-10">
                <Building2 className="w-16 h-16 opacity-30" />
                <span className="font-bold uppercase tracking-widest text-xs">Foto Condomínios</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Atendimento para Condomínios</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Oferecemos logística simplificada e condições especiais para agendamentos coletivos em condomínios de Rondonópolis. 
                Sua casa limpa com a praticidade que você precisa.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Agendamento Coletivo
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Condições Especiais para Grupos
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Logística Prática e Segura
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-blue-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Como Funciona?</h2>
            <p className="text-blue-200">Simples, rápido e sem complicações.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center relative">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full border-t-2 border-dashed border-blue-700 -translate-x-1/2"></div>
                )}
                <div className="w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-blue-700 text-blue-400">
                  <div className="scale-150">{step.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{idx + 1}. {step.title}</h3>
                <p className="text-blue-200 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-6" referrerPolicy="no-referrer" />
              <span className="text-slate-400 font-medium">Avaliações</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">O que dizem nossos clientes</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1 text-orange-500">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.round(googleRating) ? 'fill-current' : 'text-slate-200'}`} />)}
              </div>
              <span className="font-bold text-slate-900">{googleRating.toFixed(1)} / 5.0</span>
              {totalRatings > 0 && <span className="text-slate-400 text-sm">({totalRatings} avaliações)</span>}
            </div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {testimonials.map((t: any, idx) => (
                  <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative h-full flex flex-col">
                      <div className="absolute top-6 right-8">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="G" className="w-4 h-4 opacity-20" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex gap-1 text-orange-500 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'fill-current' : 'text-slate-200'}`} />)}
                      </div>
                      <p className="text-slate-700 italic mb-6 flex-grow">"{t.text}"</p>
                      <div className="flex items-center gap-3">
                        {t.photo ? (
                          <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {t.name[0]}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                          <span className="text-slate-400 text-[10px] uppercase tracking-wider">{t.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={scrollPrev}
              className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="https://www.google.com/search?q=O+Doutor+Limpeza+Rondonópolis#lrd=0x93636f888888888b:0x888888888888888b,1" 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2"
            >
              Ver todas as avaliações no Google
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Dúvidas Frequentes</h2>
            <p className="text-slate-600">Tudo o que você precisa saber sobre nossos serviços.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button 
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-[2.5rem] p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
            <h2 className="text-3xl sm:text-5xl font-black mb-6 relative">Sua casa merece esse cuidado.</h2>
            <p className="text-xl text-blue-100 mb-10 relative max-w-2xl mx-auto">
              Recupere a beleza e a saúde dos seus estofados hoje mesmo. Orçamento rápido e sem compromisso.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-black hover:bg-blue-50 transition-all shadow-xl relative group">
              <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
              Agende pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <img 
                  src="assets/images/logo.png" 
                  alt="O Doutor Limpeza" 
                  style={{ height: '40px', width: 'auto' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="font-bold text-xl uppercase tracking-tight">O Doutor Limpeza</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Nossa família cuida da sua. Higienização profissional de estofados com tecnologia de ponta em Rondonópolis, MT.
              </p>
              <div className="flex gap-4">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Serviços</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>Higienização de Sofás</li>
                <li>Higienização de Colchões</li>
                <li>Poltronas e Cadeiras</li>
                <li>Higienização de Tapetes</li>
                <li>Impermeabilização</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Contato</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Rondonópolis, MT</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>(66) 99717-0914</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>@odoutorlimpeza</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Horários</h4>
              <div className="space-y-3 text-slate-400 text-sm">
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="font-medium">Segunda a Sexta:</span>
                  <span className="text-white">07h às 11h | 13h às 17h</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="font-medium">Sábado:</span>
                  <span className="text-white">07h às 11h | 13h às 17h</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="font-medium">Domingo:</span>
                  <span className="text-red-400 font-bold">Fechado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
            <p>© {new Date().getFullYear()} O Doutor Limpeza. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <span>Política de Privacidade</span>
              <span>Termos de Uso</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_URL} 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-200 hover:bg-green-600 hover:scale-110 transition-all group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          Falar com Especialista
        </span>
      </a>
    </div>
  );
}
