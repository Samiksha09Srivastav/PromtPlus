'use client';

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {

  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect( ()=> {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProviders();
  },[])

  return (
    <nav className="flex-between w-full mb-14 pt-3">
      <Link href='/' className=" flex gap-2 flex-center ">
        <Image 
          src='/assets/images/logo.svg'
          alt='Hythere logo'
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptPulse</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden ">

        { isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className="black_btn">
              Create Post
            </Link>
            <button type='button' className='outline_btn' onClick={signOut}>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image 
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                className="rounded-full"
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            { providers && 
              Object.values(providers).map((providers) => {
                <button
                  type="button"
                  key={providers.name}
                  onClick={()=> signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
            })}
          </>
        ) }

      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
            { isUserLoggedIn ? (
              <div className="flex">
                <Image 
                  src='/assets/images/logo.svg'
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt='profile'
                  onClick={ () => setToggleDropDown((prev)=> !prev)}
                />

                { toggleDropDown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={()=> setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={()=> setToggleDropDown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button
                      type="button"
                      onClick={()=> {setToggleDropDown(false);signOut();}}
                      className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </div>
                )}

              </div>
            ):(
              <>
                { providers && 
                  Object.values(providers).map((providers) => {
                    <button
                      type="button"
                      key={providers.name}
                      onClick={()=> signIn(provider.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  })}
              </>
            )}
      </div>

    </nav>
  );
}

export default Nav;
