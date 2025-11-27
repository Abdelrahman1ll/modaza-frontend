export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden">
      <h1
        className="text-3xl md:text-4xl font-extrabold mb-10 text-center"
        style={{ color: "var(--color-dark)" }}
      >
        About Us
      </h1>

      <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
        <li>
          • We are a contemporary clothing brand blending comfort and premium
          quality.
        </li>
        <li>• نحن علامة ملابس عصرية تجمع بين الراحة والجودة العالية.</li>

        <li>• Our designs offer a calm, confident style for every occasion.</li>
        <li>• تصاميمنا تمنحك أسلوبًا هادئًا وواثقًا لكل مناسبة.</li>

        <li>
          • Combining practicality with refined taste to reflect your unique
          identity.
        </li>
        <li>• تجمع بين العملية والذوق الرفيع لتعكس هويتك الفريدة.</li>
      </ul>
    </div>
  );
}
