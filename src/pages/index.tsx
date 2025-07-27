export default function Home() {
  console.log("HOME", process.env.ENV);
  console.log("HOME", process.env.NEXT_PUBLIC_ENV);
  return <main>HOME</main>;
}
