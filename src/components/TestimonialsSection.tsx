import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Bast of Philosophy",
    handle: "@BofPhilosophyQ",
    text: "Base44 looks perfect for founders who want to build fast without...",
    avatar: "/src/assets/avatar-1.jpg"
  },
  {
    id: 2,
    name: "Hasan Toor",
    handle: "@hasantowr",
    text: "You can now build a full AI app without writing any code. This to...",
    avatar: "/src/assets/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Maria Martin",
    handle: "@marias_martin",
    text: "Okay, Base44 has blown my mind 🤯. No iterations, no changes,...",
    avatar: "/src/assets/avatar-3.jpg"
  },
  {
    id: 4,
    name: "John Developer",
    handle: "@johndev",
    text: "Just built my first app in minutes! The AI understands exactly what I want.",
    avatar: "/src/assets/avatar-1.jpg"
  },
  {
    id: 5,
    name: "Ariel MI",
    handle: "@arielmi",
    text: "Amazing understanding of the user needs and thorough handli...",
    avatar: "/src/assets/avatar-2.jpg"
  },
  {
    id: 6,
    name: "Thatweb3guy",
    handle: "@myfootyfantasy",
    text: "@MS_BASE44 @base_44 I gave it a try and I must to be truthful, it...",
    avatar: "/src/assets/avatar-3.jpg"
  },
  {
    id: 7,
    name: "Roy Kotzer",
    handle: "@roykotzer",
    text: "Start building in minutes. See results immediately. Great!",
    avatar: "/src/assets/avatar-1.jpg"
  },
  {
    id: 8,
    name: "FastBuilder",
    handle: "@fastbuild",
    text: "Faster than I ever imagined. The backend is automatically generated!",
    avatar: "/src/assets/avatar-2.jpg"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-w-[320px] mx-4">
    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
      {testimonial.text}
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
          <div className="text-gray-500 text-xs">{testimonial.handle}</div>
        </div>
      </div>
      <div className="text-gray-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-yellow-50 overflow-hidden">
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-medium mb-4 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          "Okay, @base_44 has <span className="text-orange-500">blown my mind</span>."
        </h2>
        <p className="text-lg text-foreground/70 mb-8">
          And other great things our users say about us.
        </p>
        <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3">
          Start building
        </Button>
      </div>

      {/* Upper row - scrolls right */}
      <div className="relative mb-8 group">
        <div className="flex animate-scroll-right group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Lower row - scrolls left */}
      <div className="relative group">
        <div className="flex animate-scroll-left group-hover:[animation-play-state:paused]">
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
            <TestimonialCard key={`bottom-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;