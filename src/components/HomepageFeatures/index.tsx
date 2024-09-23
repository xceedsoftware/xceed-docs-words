import clsx from 'clsx'; 
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';  // Importa el componente Link para los enlaces internos
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;  // Agrega una propiedad para la ruta del enlace
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Words for .NET',
    Svg: require('@site/static/img/words-for-net.svg').default,
    description: (
      <>
       Create or manipulate Microsoft Word documents from your .NET applications, without requiring Word or Office to be installed. Convert Word documents to PDF (not all Word elements are supported; use the trial period to validate all required elements do get converted). Fast and lightweight. Widely used and backed by a responsive support and development team whose sole ambition is your complete satisfaction.
      </>      
    ),
    link: '/docs/intro',  // Ruta hacia la documentación
  },
  {
    title: 'Workbooks',
    Svg: require('@site/static/img/workbooks-for-net.svg').default,
    description: (
      <>
        Create or manipulate Microsoft Excel documents from your .NET applications, without the need for Excel or Office to be installed. 
        This is a fast and lightweight component, backed by a responsive support and development team whose sole ambition is your complete satisfaction.
      </>
    ),
    link: '/workbooks/intro',  // Ruta hacia la documentación
  },
  {
    title: 'Zip for .NET',
    Svg: require('@site/static/img/zip-for-net.svg').default,
    description: (
      <>
        Flexible, reliable and mature Zip/Unzip library, with a +18-year track record. The first commercial library for .NET, it has been continually improved and updated ever since. Backed by a responsive support and development team whose sole ambition is your complete satisfaction.
      </>
    ),
    link: '/zip/intro',  // Ruta hacia la documentación
  },
  {
    title: 'FTP for .NET',
    Svg: require('@site/static/img/ftp-for-net.svg').default,
    description: (
      <>
        Flexible, reliable and mature, with a 14-year track record. Easily add efficient FTP and FTPS (FTP over SSL) file transfer capabilities to your .NET or ASP.NET apps. Backed by a responsive support and development team whose sole ambition is your complete satisfaction.
      </>
    ),
    link: '/ftp/intro',  // Ruta hacia la documentación
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <Link to={link}> {/* Sólo la imagen será enlace */}
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Link to={link}> {/* Sólo el título será enlace */}
          <Heading as="h3">{title}</Heading>
        </Link>
        <p>{description}</p> {/* La descripción no es enlace */}
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
