/* eslint-disable import/no-relative-parent-imports */
import SettingsLayout from 'pages/Settings';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Ui } from '@databrainhq/plugin';
import Flex from 'components/Flex';
import AccessControl from 'components/AccessControl';
import useWhitelistedDomains from 'hooks/useWhitelistedDomains';

const removeHTTP = (url: string) => {
  return url.replace(/^(?:\w+:)?\/\/|[\\/]+$/g, '');
};

const WhitelistDomains = () => {
  const [domains, setDomains] = React.useState<string[]>([]);
  const [domainInput, setDomainInput] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const scrollRef = useRef() as React.RefObject<HTMLDivElement>;

  const {
    whitelistedDomains,
    saveWhitelistedDomains,
    isLoadingWhitelistedDomains,
  } = useWhitelistedDomains();

  const domainValidation = useCallback(
    (type: 'domain' | 'ip' | 'localhost', rootDomain: string) => {
      const regex = {
        domain: /^([a-z0-9-]+\.)+[a-z]{2,3}(:\d+)?$/i,
        ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d+)?$/,
        localhost: /^localhost(:\d+)$/i,
      };

      if (regex[type].test(rootDomain)) {
        setDomains((prev) => [...new Set([...prev, rootDomain])]);
        setDomainInput('');
        setError('');
        return;
      }
      setError(`Please enter a valid address`);
    },
    []
  );

  const addTrustedDomain = useCallback(() => {
    if (!domainInput.trim()) {
      setError('Please enter a domain');
      return;
    }

    const rootDomain = removeHTTP(domainInput);

    if (rootDomain.includes('localhost')) {
      domainValidation('localhost', rootDomain);
      return;
    }

    if (Number(rootDomain.replaceAll(/[.:]/g, ''))) {
      domainValidation('ip', rootDomain);
      return;
    }
    domainValidation('domain', rootDomain);
  }, [domainInput]);

  const removeTrustedDomain = useCallback((domain: string) => {
    setDomains((prev) => prev.filter((item) => item !== domain));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await saveWhitelistedDomains(domains);
    },
    [saveWhitelistedDomains, domains]
  );

  useEffect(() => {
    if (!whitelistedDomains.length) return;
    setDomains(whitelistedDomains);
  }, [whitelistedDomains]);

  const headers = useMemo(() => {
    return ['domain', 'action'].map((header) => ({
      name: header,
      columnKey: header,
      colSpan: header === 'action' ? 1 : 3,
      columnCell:
        header === 'action'
          ? (row: Record<string, any>) => (
              <Flex className="dbn-gap-2">
                <AccessControl feature="whitelistedDomains" permission="Edit">
                  <Ui.Button
                    variant="tertiary"
                    type="button"
                    onClick={() => {
                      setDomainInput(row.domain);
                      scrollRef.current?.scrollIntoView({
                        inline: 'start',
                        behavior: 'smooth',
                      });
                    }}
                    leftIcon={<Ui.Icons name="pencil-simple" />}
                  />
                </AccessControl>
                <AccessControl feature="whitelistedDomains" permission="Delete">
                  <Ui.Button
                    variant="tertiary"
                    type="button"
                    onClick={() => removeTrustedDomain(row.domain)}
                    leftIcon={<Ui.Icons name="delete" />}
                  />
                </AccessControl>
              </Flex>
            )
          : undefined,
    }));
  }, [removeTrustedDomain]);

  return (
    <>
      <SettingsLayout>
        <section className="dbn-w-full dbn-h-full dbn-p-10 dbn-flex dbn-flex-col dbn-gap-[22px] dbn-bg-white">
          <div className="dbn-flex dbn-flex-col" ref={scrollRef}>
            <Ui.Text variant="heading-lg">Whitelist Domains</Ui.Text>
            <Ui.Text variant="body-text-sm">
              Whitelist domain on which you want to embed your dashboards
            </Ui.Text>
          </div>
          <form
            onSubmit={handleSubmit}
            className="dbn-flex dbn-flex-col dbn-gap-[22px]"
          >
            <Flex direction="col" className="dbn-gap-[22px]">
              <AccessControl feature="whitelistedDomains" permission="Edit">
                <Flex direction="col" className="dbn-gap-1">
                  <Flex className="dbn-gap-4 dbn-items-end">
                    <Ui.InputField
                      name="domain"
                      label="Allowed Origins"
                      placeholder="e.g. usedatabrain.com"
                      value={domainInput}
                      type="url"
                      onChange={(e) => {
                        setDomainInput(e.target.value.toLowerCase());
                        setError('');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTrustedDomain();
                        }
                      }}
                    />
                    <Ui.Button
                      variant="primary"
                      type="button"
                      onClick={() => addTrustedDomain()}
                      fitContainer
                    >
                      Add
                    </Ui.Button>
                  </Flex>
                  {error && (
                    <Ui.Text variant="body-text-sm" color="alert">
                      {error}
                    </Ui.Text>
                  )}
                  <Ui.Text variant="body-text-sm">
                    Enter your origin without http:// or https://. For example,
                    if you want to embed your dashboard on https://demo.com,
                    then enter demo.com
                  </Ui.Text>
                </Flex>
              </AccessControl>
              <Flex direction="col" className="dbn-gap-1">
                <Ui.Text variant="label">Domains</Ui.Text>
                <Ui.List
                  headers={headers}
                  data={domains.map((domain) => ({
                    domain,
                  }))}
                />
              </Flex>
            </Flex>
            <Ui.Button
              variant="primary"
              type="submit"
              isDisabled={isLoadingWhitelistedDomains}
            >
              {isLoadingWhitelistedDomains ? 'Saving...' : 'Save'}
            </Ui.Button>
          </form>
        </section>
      </SettingsLayout>
    </>
  );
};

export default React.memo(WhitelistDomains);
