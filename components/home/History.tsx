"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Parallax } from "@/components/animations/Parallax";

export function History() {
  return (
    <section id="historia" className="relative overflow-hidden bg-white py-24 md:py-32">
      <Parallax speed={0.15}>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <span className="mb-4 inline-block text-xs font-semibold tracking-[0.2em] text-rio uppercase">
                Historia
              </span>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-carbon sm:text-5xl lg:text-6xl">
                Un mercado con
                <br />
                <span className="text-rio">alma de pueblo</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-carbon/60">
                <p>
                  El Puerto de Frutos nació hace más de 50 años como un punto de
                  encuentro entre los productores del Delta y los visitantes que
                  llegaban en lancha desde Tigre. Lo que empezó con unos pocos
                  puestos de frutas y verduras se transformó en el mercado
                  artesanal más importante de la región.
                </p>
                <p>
                  Hoy, el Puerto de Frutos es mucho más que un mercado. Es un
                  paseo, un lugar de encuentro, una experiencia. Miles de
                  personas lo visitan cada fin de semana para descubrir
                  artesanías, decoración, muebles, plantas, arte y gastronomía
                  en un entorno único junto al río.
                </p>
                <p>
                  Este directorio nace con la misión de llevar la magia del
                  Puerto de Frutos al mundo digital. Para que cualquiera,
                  desde cualquier lugar, pueda descubrir los tesoros que
                  esconden sus pasillos.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-premium-xl">
                <div className="aspect-[4/5] bg-gradient-to-br from-rio/20 via-arena to-rio/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl bg-white/90 p-6 backdrop-blur-md">
                    <p className="text-sm italic leading-relaxed text-carbon/70">
                      &ldquo;El Puerto de Frutos no es solo un lugar para
                      comprar, es un lugar para vivir. Cada puesto tiene una
                      historia, cada producto tiene un origen.&rdquo;
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-rio flex items-center justify-center text-white font-bold text-sm">
                        MC
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-carbon">
                          María Cristina
                        </p>
                        <p className="text-xs text-carbon/40">
                          Comerciante desde 1987
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Parallax>
    </section>
  );
}
