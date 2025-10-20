import Head from "next/head";

interface HeaderProps {
  header: string;
  description: string;
}

export default function Header(props: Readonly<HeaderProps>) {
  return (
    <>
      <Head>
        <title>{props.header}</title>
        <meta name="description" content={props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
