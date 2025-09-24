import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.companyInfo}>
            <Link href="/" className={styles.logo}>InvestWise</Link>
            <p className={styles.description}>
              Building financial futures through smart investing. Your trusted partner on the path to financial freedom.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <svg className={styles.icon} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523..."/></svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg className={styles.icon} fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0..."/></svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <svg className={styles.icon} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14..."/></svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className={styles.sectionTitle}>Products</h3>
            <ul className={styles.linkList}>
              <li><Link href="/products" className={styles.link}>All Products</Link></li>
              <li><Link href="/products#portfolios" className={styles.link}>Managed Portfolios</Link></li>
              <li><Link href="/products#retirement" className={styles.link}>Retirement Planning</Link></li>
              <li><Link href="/products#savings" className={styles.link}>High-Yield Savings</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={styles.sectionTitle}>Resources</h3>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>Learning Center</a></li>
              <li><a href="#" className={styles.link}>Investment Guides</a></li>
              <li><a href="#" className={styles.link}>Market Insights</a></li>
              <li><a href="#" className={styles.link}>Tax Strategies</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={styles.sectionTitle}>Company</h3>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>About Us</a></li>
              <li><a href="#" className={styles.link}>Careers</a></li>
              <li><a href="#" className={styles.link}>Contact Us</a></li>
              <li><a href="#" className={styles.link}>Press</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} InvestWise, Inc. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.link}>Privacy Policy</a>
            <a href="#" className={styles.link}>Terms of Service</a>
            <a href="#" className={styles.link}>Cookie Policy</a>
            <a href="#" className={styles.link}>Legal Notices</a>
          </div>
          <p className={styles.disclaimer}>
            InvestWise is a registered investment advisor with the SEC. Investing involves risk, and past performance does not guarantee future results.
            By using this website, you accept our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </footer>
  );
}
