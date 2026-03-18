export default function Map() {
  return (
    <section className="h-96 relative">
      <div className="absolute inset-0 z-10 pointer-events-none border-t border-b border-gray-800" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9741578849916!2d79.84965731477398!3d6.929463194950208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592f0b8b4b23%3A0x5e8d75d5a3e5a85a!2sGalle%20Rd%2C%20Colombo%2000300!5e0!3m2!1sen!2slk!4v1647887654321!5m2!1sen!2slk"
        width="100%"
        height="100%"
        style={{
          filter: "grayscale(100%) invert(90%) contrast(90%)",
          border: 0,
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="bg-black border border-amber-400 px-8 py-4 text-center">
          <p className="text-amber-400 text-xs tracking-widest mb-1">FIND US</p>
          <p className="text-white font-serif text-lg">
            123 Galle Road, Colombo 03
          </p>
        </div>
      </div>
    </section>
  );
}
