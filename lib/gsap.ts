import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registro único y centralizado de plugins GSAP. Solo en cliente: ScrollTrigger
// toca `document` y rompería el render de servidor si se registrara ahí.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
