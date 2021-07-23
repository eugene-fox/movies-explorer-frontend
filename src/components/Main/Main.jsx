import './Main.css';

import { Promo } from '../Promo/Promo';
import { NavTab } from '../NavTab/NavTab';
import { AboutProject } from '../AboutProject/AboutProject'

export function Main() {
  return (
    <main className="main">
      <Promo />
      <NavTab />
      <AboutProject />
    </main>
  )
}