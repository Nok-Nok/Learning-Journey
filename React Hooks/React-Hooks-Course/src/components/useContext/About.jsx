import React, { useContext } from 'react';
import LocaleContext from './LocaleContext';

const employees = {
  en: [
    {
      name: 'Mikenzi',
      title: 'CEO',
    },
    {
      name: 'Tyler',
      title: 'Software Engineer',
    },
    {
      name: 'Jake',
      title: 'Marketing',
    },
  ],
  es: [
    {
      name: 'Mikenzi',
      title: 'CEO',
    },
    {
      name: 'Tyler',
      title: 'Ingeniero de software',
    },
    {
      name: 'Jake',
      title: 'MÃ¡rketing',
    },
  ],
};

function Employees({ locale }) {
  return (
    <ul className="employees">
      {employees[locale].map(({ name, title }) => (
        <li key={name}>
          <h3>{name}</h3>
          <p>{title}</p>
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  const { locale } = useContext(LocaleContext);
  return (
    <div>
      <h1>About</h1>
      <Employees locale={locale} />
    </div>
  );
}
