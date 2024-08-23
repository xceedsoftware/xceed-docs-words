import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};


const FeatureList: FeatureItem[] = [
  {
    title: 'Complete control',
    Svg: require('@site/static/img/word.svg').default,
    description: (
      <>
        Lets your application create modify MS Word .docx documents. It gives you complete 
        control over all content in a Word document, and lets you set all commonly used element 
        types, such as paragraphs, bulleted or numbered lists, images, tables, charts, headers 
        and footers, sections, bookmarks, and more.
      </>
    ),
  },
  {
    title: 'A great reporting tool',
    Svg: require('@site/static/img/chart2.svg').default,
    description: (
      <>
        Lets you create company reports that you first design with the familiar and rich 
        editing capabilities of Microsoft Word instead of with a reporting tool’s custom editor. 
      </>
    ),
  },
  {
    title: '.NET Technology',
    Svg: require('@site/static/img/dotnet_bot.svg').default,
    description: (
      <>
        Object-oriented design created specifically for the .NET framework. Supports VB.NET, C#, and Managed C++.
        Supports .NET Framework 4.0 and up, .NET 5.0 and up, ASP.NET 4.0 and up, Visual Studio 2010 and up.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
