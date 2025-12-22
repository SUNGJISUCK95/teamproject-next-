export default function RentalLayout({ children }) {
  // Root Layout에서 받은 children 안에 이 Layout의 children이 중첩됩니다.
  return (
    <section id="rental_container">
      {children}
    </section>
  );
}