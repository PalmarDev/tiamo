export type LovePhoto = {
  alt: string;
  src: string;
};

export const loveLandingContent = {
  eyebrow: "Nuestro pequeño universo",
  title: "Gabriel & Aydelin",
  subtitle: "Cada recuerdo contigo se convierte en uno de mis lugares favoritos.",
  dedication: {
    title: "Donde siempre quiero volver",
    body: "Esta página guarda una parte de todo lo bonito que hemos vivido. Gracias por tu amor, por tu calma y por hacer que incluso los días sencillos se sientan especiales.",
    signature: "Con todo mi amor, Gabriel",
  },
  photos: [
    {
      src: "/images/love/photo-1.jpg",
      alt: "Un recuerdo especial juntos",
    },
    {
      src: "/images/love/photo-2.jpg",
      alt: "Una foto llena de cariño y complicidad",
    },
    {
      src: "/images/love/photo-3.jpg",
      alt: "Un instante bonito que merece quedarse para siempre",
    },
    {
      src: "/images/love/photo-4.jpg",
      alt: "Un momento lleno de amor y felicidad",
    },
    {
      src: "/images/love/photo-5.jpg",
      alt: "Una imagen que refleja nuestra conexión especial",
    },
    {
      src: "/images/love/photo-6.jpg",
      alt: "Un recuerdo que siempre me hace sonreír",
    },
    {
      src: "/images/love/photo-7.jpg",
      alt: "Una foto que captura nuestra complicidad y alegría",
    },
    {
      src: "/images/love/photo-8.jpg",
      alt: "Un instante lleno de ternura y amor",
    },
    {
      src: "/images/love/photo-9.jpg",
      alt: "Una imagen que refleja nuestra historia juntos",
    },
    {
      src: "/images/love/photo-10.jpg",
      alt: "Un recuerdo que siempre guardaré en mi corazón",
    },
    {
      src: "/images/love/photo-11.jpg",
      alt: "Una foto que representa nuestra conexión especial",
    },
    {
      src: "/images/love/photo-12.jpg",
      alt: "Tu iluminas mi vida con tu amor y ternura",
    },
    {
      src: "/images/love/photo-13.jpg",
      alt: "Un instante que refleja nuestra felicidad juntos",
    },
    {
      src: "/images/love/photo-14.jpg",
      alt: "Ustedes que me llenan de amor y alegría",
    },
    {
      src: "/images/love/photo-15.jpg",
      alt: "Un recuerdo que siempre me hace sonreír",
    },
    {
      src: "/images/love/photo-16.jpg",
      alt: "Compartiendo en un dia tan especial y lleno de amor",
    },
  ] satisfies LovePhoto[],
  phrases: [
    "Eres mi lugar favorito.",
    "Contigo todo se siente mejor.",
    "Me haces sonreír sin intentarlo.",
    "Tu amor me da paz.",
    "Cada día te elijo.",
    "Eres mi casualidad más bonita.",
    "Mi mundo es mejor contigo.",
    "Me encanta cuidar de ti.",
    "Eres luz en mis días.",
    "Te amo en cada detalle.",
    "A tu lado soy feliz.",
    "Gracias por existir.",
    "Me haces creer en lo bonito.",
    "Eres mi calma.",
    "Siempre quiero volver a ti.",
    "Eres mi pensamiento favorito.",
  ],
} as const;
