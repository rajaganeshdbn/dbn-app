import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import style from './MainSidebar.module.css';
import MainSidebarItem from './MainSidebarItem';
import logo from './logo.jpg';
import userImg from './user.jpeg';
import { MdSpaceDashboard } from 'react-icons/md';
import { useConfigContext } from '../../contexts/configContext';
import { Button, Modal, Tabs, TextInput, type TabsRef } from 'flowbite-react';
import { FiLogOut, FiSettings } from 'react-icons/fi';

type MainSidebarProps = {
  className?: string;
  token: string;
  onSubmitToken: (token: string) => void;
};

const configObj = {
  imgUrl: '',
  primaryColor: '',
  textColor: '',
  backgroundColor: '',
  highlightColor: '',
};

const applyConfig = (configData: any) => {
  const root = document.querySelector(':root') as HTMLElement;
  root?.style.setProperty('--text-color', configData.textColor);
  root?.style.setProperty('--background-color', configData.backgroundColor);
  root?.style.setProperty('--highlight-color', configData.highlightColor);
};

const MainSidebar: React.FC<MainSidebarProps> = ({
  className,
  token,
  onSubmitToken,
}) => {
  const { config: adminConfig, configId, setConfigId } = useConfigContext();
  const inputRef = useRef() as React.RefObject<HTMLInputElement>;
  const configRef = useRef() as React.RefObject<HTMLInputElement>;
  const [config, setConfig] = useState(configObj);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const brandLogoRef = useRef() as React.RefObject<HTMLInputElement>;
  const primaryColorRef = useRef() as React.RefObject<HTMLInputElement>;
  const textColorRef = useRef() as React.RefObject<HTMLInputElement>;
  const backgroundColorRef = useRef() as React.RefObject<HTMLInputElement>;
  const highlightColorRef = useRef() as React.RefObject<HTMLInputElement>;
  const [activeState, setActiveState] = useState<string>('token');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value) {
      onSubmitToken(inputRef.current.value);
      setSearchParams('');
      localStorage.setItem('token', inputRef.current.value);
      if (configRef.current && configRef.current.value) {
        setConfigId(configRef.current.value);
        localStorage.setItem('configId', configRef.current.value);
      }
      setIsModalOpen(false);
    }
  };

  const handleSubmitSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let configData = {
      imgUrl: brandLogoRef.current?.value || '',
      primaryColor: primaryColorRef.current?.value || '',
      textColor: textColorRef.current?.value || '',
      backgroundColor: backgroundColorRef.current?.value || '',
      highlightColor: highlightColorRef.current?.value || '',
    };
    setConfig(configData);
    localStorage.setItem('config', JSON.stringify(configData));
    window.location.reload();
  };

  const resetConfig = () => {
    setConfig(configObj);
    localStorage.setItem('config', JSON.stringify(configObj));
    setIsModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem('config')) {
      let configData = JSON.parse(localStorage.getItem('config') as string);
      setConfig(configData);
      applyConfig(configData);
    }
  }, []);
  useEffect(() => {
    if (adminConfig) {
      applyConfig({
        title: adminConfig?.dashboardTitle,
        imgUrl: adminConfig?.logoUrl,
        primaryColor: adminConfig?.primaryColor,
        textColor: adminConfig?.textColor,
        backgroundColor: adminConfig?.navbarColor,
        highlightColor: adminConfig?.highlightColor,
      });
    }
  }, [adminConfig]);

  return (
    <aside className={`${style.sidebarContainer} ${className ?? ''}`}>
      <div className={` ${style.companyLogo}  h-[50px]`}>
        <img
          src={config.imgUrl || adminConfig?.logoUrl || logo}
          alt="Company Logo"
          className="object-contain w-[150px] max-h-[50px]"
        />
      </div>
      <nav className="h-full flex flex-col justify-between overflow-hidden">
        <ul className={style.navlistContainer}>
          <MainSidebarItem to="/demo/">
            <span className="mr-2 text-[20px]">
              <MdSpaceDashboard />
            </span>
            Dashboard
          </MainSidebarItem>
        </ul>
      </nav>
      {!adminConfig?.settings?.isHideSettings &&
        !searchParams.get('hideSettings') && (
          <div
            className={`${style.link} mx-3 mb-4 cursor-pointer`}
            onClick={() => setIsModalOpen(true)}
          >
            <FiSettings className="text-lg" />
            <span className="ml-2 font-medium">Setting</span>
          </div>
        )}

      {!adminConfig?.settings?.isHideProfile &&
        !searchParams.get('hideProfile') && (
          <div className="border-t border-t-[#D0D4DA] p-3 relative mt-auto flex items-center justify-between gap-1">
            <div className="flex w-[90%]">
              <img
                src={userImg}
                alt="User profile image"
                className="shadow border w-8 aspect-square rounded-md"
              />

              <div className="ml-2 flex flex-col justify-center">
                <p className="text-sm font-semibold text-primary-text">
                  John Anderson
                </p>
                <span className="text-xs text-primary-text">
                  john@gmail.com
                </span>
              </div>
            </div>
            <FiLogOut className="cursor-pointer" />
          </div>
        )}
      <Modal
        show={isModalOpen}
        dismissible
        popup
        onClose={() => setIsModalOpen(false)}
        className="z-[100]"
      >
        <div className="absolute right-2 top-1">
          <Modal.Header />
        </div>
        <Modal.Body>
          <div className="w-full flex gap-4 pt-2 border-b border-b-[#D0D4DA] mb-4">
            <div
              onClick={() => setActiveState('token')}
              className={`${
                activeState === 'token' ? 'border-b border-b-black' : ''
              } p-2 cursor-pointer`}
            >
              Set Token
            </div>
            <div
              onClick={() => setActiveState('config')}
              className={`${
                activeState === 'config' ? 'border-b border-b-black' : ''
              } p-2 cursor-pointer`}
            >
              Set Config
            </div>
          </div>
          {activeState === 'token' ? (
            <form onSubmit={handleSubmit}>
              {token ? (
                <div className="text-sm mb-5">
                  <p className="font-medium">Added Token:</p>
                  <p className="flex justify-between">{token}</p>
                </div>
              ) : null}
              <input
                ref={inputRef}
                defaultValue={token}
                required
                className={style.formInput}
                placeholder="Add your token here"
              />
              <input
                ref={configRef}
                defaultValue={configId || adminConfig?.id}
                className={style.formInput}
                placeholder="Add your config id here"
              />
              <div className="flex justify-between">
                <Button color="dark" type="submit" className="!bg-gray-800">
                  Submit
                </Button>
                <Button
                  color="gray"
                  type="reset"
                  className="hover:bg-gray-100 border-dotted border-2 hover:border-gray-400"
                  onClick={() => {
                    onSubmitToken('');
                    localStorage.setItem('token', '');
                    setSearchParams('');
                    setIsModalOpen(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmitSettings}>
              <label htmlFor="title">
                <p className="text-sm text-[#374151] mb-1 font-medium">
                  Brand logo
                </p>
              </label>
              <input
                ref={brandLogoRef}
                className={style.formInput}
                placeholder="Enter brand logo url"
                pattern="https://.*"
                type="url"
                name="imgUrl"
                defaultValue={adminConfig?.logoUrl || config.imgUrl}
              />

              <label htmlFor="title">
                <p className="text-sm text-[#374151] mb-1 font-medium">
                  Primary color
                </p>
              </label>
              <input
                ref={primaryColorRef}
                className={style.formInput}
                placeholder="Input your color values ex: red / #030303"
                name="primaryColor"
                defaultValue={adminConfig?.primaryColor || config.primaryColor}
              />

              <label htmlFor="title">
                <p className="text-sm text-[#374151] mb-1 font-medium">
                  Text color
                </p>
              </label>
              <input
                ref={textColorRef}
                className={style.formInput}
                placeholder="Input your color values ex: red / #030303"
                name="textColor"
                defaultValue={adminConfig?.textColor || config.textColor}
              />

              <label htmlFor="title">
                <p className="text-sm text-[#374151] mb-1 font-medium">
                  Navbar color
                </p>
              </label>
              <input
                ref={backgroundColorRef}
                className={style.formInput}
                placeholder="Input your color values ex: red / #030303"
                name="backgroundColor"
                defaultValue={
                  adminConfig?.navbarColor || config.backgroundColor
                }
              />

              <label htmlFor="title">
                <p className="text-sm text-[#374151] mb-1 font-medium">
                  Highlight color
                </p>
              </label>
              <input
                ref={highlightColorRef}
                className={style.formInput}
                placeholder="Input your color values ex: red / #030303"
                name="highlightColor"
                defaultValue={
                  adminConfig?.highlightColor || config.highlightColor
                }
              />
              <div className="flex justify-between">
                <Button type="submit" className="!bg-gray-800">
                  Submit
                </Button>
                <Button
                  color="gray"
                  type="reset"
                  className="hover:bg-gray-100 border-dotted border-2 hover:border-gray-400"
                  onClick={resetConfig}
                >
                  Reset
                </Button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </aside>
  );
};
export default MainSidebar;
