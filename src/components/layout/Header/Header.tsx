'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LayoutDashboard, Home, UserCircle, Settings, LogOut } from 'lucide-react';
import styles from './header.module.css';


export default function Header() {
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const AuthLinks = () => (
    <>
      <Link href="/auth/login" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
        Sign In
      </Link>
      <Link href="/auth/signup" className={styles.signupButton} onClick={() => setIsMenuOpen(false)}>
        Get Started
      </Link>
    </>
  );

  const UserProfile = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={styles.profileContainer} ref={dropdownRef}>
      <button onClick={() => setDropdownOpen(!isDropdownOpen)} className={styles.avatarButton}>
        {user?.image ? (
          <Image src={user.image} alt={user.name} width={40} height={40} className={styles.avatarImage} />
        ) : (
          <span className={styles.avatarInitials}>{getInitials(user?.name || 'U')}</span>
        )}
      </button>
      {isDropdownOpen && (
        <div className={`${styles.dropdownMenu} ${isMobile ? styles.dropdownMenuMobile : ''}`}>
          <div className={styles.dropdownHeader}>
            <p className={styles.dropdownUserName}>{user?.name}</p>
            <p className={styles.dropdownUserEmail}>{user?.email}</p>
          </div>
          <div className={styles.dropdownDivider}></div>
          {!isDashboard ? (
            <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
              <LayoutDashboard size={16} />
              <span>My Dashboard</span>
            </Link>
          ) : (
            <Link href="/" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
              <Home size={16} />
              <span>Home</span>
            </Link>
          )}
          <Link href="/dashboard/profile" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
            <UserCircle size={16} />
            <span>Profile</span>
          </Link>
          <Link href="/dashboard/settings" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
            <Settings size={16} />
            <span>Settings</span>
          </Link>
          <div className={styles.dropdownDivider}></div>
          <button onClick={handleLogout} className={styles.dropdownItem}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.inner}>
            {/* Logo */}
            <div className={styles.logo}>
              <Link href="/" className={styles.brand}>
                InvestWise
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
              <Link href="/products" className={styles.navLink}>
                Products
              </Link>
              <Link href="#about" className={styles.navLink}>
                About
              </Link>
              <Link href="#contact" className={styles.navLink}>
                Contact
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className={styles.authContainer}>
              {loading ? <div className={styles.loader}></div> : user ? <UserProfile /> : <AuthLinks />}
            </div>

            {/* Mobile Menu Button */}
            <div className={styles.mobileMenuBtn}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={styles.mobileIcon}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={styles.mobileMenu}>
              <nav className={styles.mobileNav}>
                <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/products" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  Products
                </Link>
                <Link href="#about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link href="#contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
                <div className={styles.mobileAuth}>
                  {loading ? <div className={styles.loader}></div> : user ? <UserProfile isMobile={true} /> : <AuthLinks />}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
