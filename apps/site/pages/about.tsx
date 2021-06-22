import './about.module.css';
import { GetStaticProps } from 'next';

export interface AboutProps {
  name: string;
}

export function About(props: AboutProps) {
  return (
    <div>
      <h1>Welcome to about!</h1>
    </div>
  );
}

export default About;

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  return {
    props: {
      name: 'Juri',
    },
  };
};
