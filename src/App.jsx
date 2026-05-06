
import { motion } from "framer-motion";
import { ArrowRight, Crown, Sparkles, Users } from "lucide-react";

import hero from "./assets/franciane(1).png";
import fg5 from "./assets/fg5(1).png";
import fundo from "./assets/fundo1(20).png";
import logo from "./assets/logo3d(1).png";
import recrutamento from "./assets/recrutamento(1).png";
import implantacao from "./assets/implantacao(1).png";
import treinamento from "./assets/treinamento(1).png";
import emocional from "./assets/emocional(1).png";
import vagas from "./assets/vagas(1).png";
import parceiros from "./assets/parceiros.png";

const services = [
  {title:"Recrutamento Premium", img:recrutamento},
  {title:"Implantação de RH", img:implantacao},
  {title:"Treinamentos", img:treinamento},
  {title:"Inteligência Emocional", img:emocional},
]

export default function App(){
  return(
    <div className="bg-black text-white overflow-hidden">

      <section
        className="min-h-screen relative flex items-center hero-grid"
        style={{
          backgroundImage:`linear-gradient(rgba(0,0,0,.75),rgba(0,0,0,.92)),url(${fundo})`,
          backgroundSize:"cover",
          backgroundPosition:"center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-yellow-500/10">
          <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
            <img src={logo} className="h-12"/>
            <div className="hidden md:flex gap-10 text-sm uppercase tracking-[3px]">
              <a href="#sobre">Sobre</a>
              <a href="#servicos">Serviços</a>
              <a href="#clientes">Clientes</a>
              <a href="#vagas">Vagas</a>
            </div>
            <a
              href="https://wa.me/5577974005333"
              className="premium-btn"
            >
              WhatsApp
            </a>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">

          <motion.div
            initial={{opacity:0,y:60}}
            animate={{opacity:1,y:0}}
            transition={{duration:1}}
          >
            <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8">
              <Sparkles className="text-yellow-400"/>
              <span className="text-sm tracking-[3px] uppercase">
                RH Estratégico Premium
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-none">
              Transformando
              <span className="block text-yellow-400">
                Pessoas
              </span>
              em Resultados
            </h1>

            <p className="text-zinc-300 text-xl mt-8 leading-relaxed max-w-2xl">
              Consultoria de RH ultra sofisticada, moderna e focada em alta performance empresarial.
            </p>

            <div className="flex gap-5 mt-10 flex-wrap">
              <a
                href="https://wa.me/5577974005333"
                className="premium-btn flex items-center gap-2"
              >
                Falar Agora
                <ArrowRight/>
              </a>

              <a
                href="#servicos"
                className="glass px-8 py-5 rounded-2xl font-bold"
              >
                Explorar
              </a>
            </div>
          </motion.div>

          <motion.div
  initial={{opacity:0,scale:.8}}
  animate={{opacity:1,scale:1}}
  transition={{duration:1.2}}
  className="relative flex justify-end overflow-visible"
>
            <div className="absolute w-[500px] h-[500px] bg-yellow-500/20 blur-[120px] rounded-full"></div>

            <div className="hero-image-wrapper translate-x-12">

  <div className="hero-glow"></div>

  <img
    src={hero}
    className="hero-image"
  />

</div>

          </motion.div>
        </div>
      </section>

      <section id="sobre" className="py-32 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center mb-20">
            <span className="text-yellow-400 uppercase tracking-[4px]">
              Sobre Franciane Gusmão
            </span>

            <h2 className="text-6xl font-black mt-5">
              Liderança. Estratégia. Pessoas.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="glass rounded-[32px] p-10">
              <Crown className="text-yellow-400 mb-6" size={42}/>
              <h3 className="text-3xl font-black mb-5">
                +15 anos
              </h3>
              <p className="text-zinc-300 leading-8">
                Especialista em desenvolvimento humano, liderança e recrutamento estratégico.
              </p>
            </div>

            <div className="glass rounded-[32px] p-10">
              <Users className="text-yellow-400 mb-6" size={42}/>
              <h3 className="text-3xl font-black mb-5">
                Empresas Transformadas
              </h3>
              <p className="text-zinc-300 leading-8">
                Estruturas modernas de RH implantadas com foco em cultura e crescimento.
              </p>
            </div>

            <div className="glass rounded-[32px] p-10">
              <Sparkles className="text-yellow-400 mb-6" size={42}/>
              <h3 className="text-3xl font-black mb-5">
                Método FG5
              </h3>
              <p className="text-zinc-300 leading-8">
                Metodologia exclusiva de aceleração de líderes e equipes.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section id="servicos" className="py-32">
        <div className="max-w-7xl mx-auto px-8">

          <div className="flex justify-between items-end mb-20 flex-wrap gap-6">
            <div>
              <p className="text-yellow-400 uppercase tracking-[4px]">
                Serviços
              </p>
              <h2 className="text-6xl font-black mt-4">
                Soluções Premium
              </h2>
            </div>

            <div className="glass px-6 py-4 rounded-2xl">
              Atendimento Nacional
            </div>
          </div>

          <motion.div
  whileHover={{
    scale:1.02,
    rotateX:2,
    rotateY:-2
  }}
  transition={{duration:.4}}
  className="featured-card relative rounded-[40px] overflow-hidden border border-yellow-500/30 mb-10"
>
<div className="best-seller-badge">
  MAIS VENDIDO
</div>

<img src={fg5} className="w-full h-[500px] object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            <div className="absolute bottom-10 left-10 max-w-2xl">
              <div className="gold inline-block text-black px-5 py-2 rounded-full font-black mb-6">
                Método Exclusivo FG5
              </div>

              <h3 className="text-5xl font-black">
                Transformação executiva em 5 encontros.
              </h3>

              <p className="text-zinc-300 mt-6 text-lg leading-8">
                Uma experiência estratégica premium para empresas e líderes de alta performance.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {services.map((service,index)=>(
              <motion.div
                key={index}
                whileHover={{y:-12}}
                className="relative rounded-[30px] overflow-hidden h-[500px] border border-yellow-500/10"
              >
                <img
                  src={service.img}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-black">
                    {service.title}
                  </h3>

                  <button className="premium-btn mt-6">
                    Saiba Mais
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section id="clientes" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-8 text-center">

          <p className="text-yellow-400 uppercase tracking-[4px]">
            Empresas Atendidas
          </p>

          <h2 className="text-6xl font-black mt-4 mb-16">
            Resultados Reais
          </h2>

          <div className="clients-marquee">

  <div className="clients-track">

    <img
      src={parceiros}
      className="clients-image"
    />

    <img
      src={parceiros}
      className="clients-image"
    />

  </div>

</div>

        </div>
      </section>

      <section id="vagas" className="py-32">
        <div className="max-w-7xl mx-auto px-8">

          <div className="relative overflow-hidden rounded-[40px] border border-yellow-500/20">
            <img src={vagas} className="w-full h-[550px] object-cover"/>

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>

            <div className="absolute left-14 top-1/2 -translate-y-1/2 max-w-2xl">
              <span className="gold text-black px-5 py-2 rounded-full font-black">
                Portal de Vagas
              </span>

              <h2 className="text-7xl font-black leading-none mt-8">
                Oportunidades
                <span className="block text-yellow-400">
                  incríveis
                </span>
              </h2>

              <button className="premium-btn mt-10">
                Ver Vagas
              </button>
            </div>

          </div>

        </div>
      </section>

      <footer className="border-t border-yellow-500/10 py-12 text-center text-zinc-500">
        <img src={logo} className="h-16 mx-auto mb-6"/>
        <p>FG RH Premium © 2026</p>
      </footer>

    </div>
  )
}
