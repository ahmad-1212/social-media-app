const Section = ({ children, className = "" }) => {
  return (
    <section className={`mb-[2rem] sm:mb-[4rem] px-2 md:px-0 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
