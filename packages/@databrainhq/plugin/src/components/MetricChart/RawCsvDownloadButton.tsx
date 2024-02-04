/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-await-in-loop */
/* eslint-disable react/forbid-elements */
import React, { useCallback, useState } from 'react';
import styles from './metric-chart.module.css';
import { Loader } from '@/components';
import { API_BASE_URL, METRIC_DOWNLOAD_RAW_CSV_PATH } from '@/consts/api';
import { IS_SELF_HOSTED } from '@/consts';

type RawCsvDownloadButtonProps = {
  fileName: string;
  companyIntegrationId: string;
  integrationName: string;
  query: string;
  className?: string;
  children?: React.ReactNode;
  updateDownloadProgress: (isEnable: boolean) => void;
};

export const RawCsvDownloadButton = ({
  fileName,
  companyIntegrationId,
  integrationName,
  query,
  className,
  children,
  updateDownloadProgress,
}: RawCsvDownloadButtonProps) => {
  const [isLoading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openNewTab = useCallback(async () => {
    try {
      setLoading(true);
      const newTab = window.open('', '_blank');

      if (newTab) {
        // Create a button in the new tab's HTML
        newTab.document.write(`<html>
        <body>
        
            <p id="progress-text">Downloading...</p>

            </body></html>`);
        const scriptElement = newTab.document.createElement('script');
        // Define the downloadCsv function
        scriptElement.innerHTML = `
      async function downloadCsv() {
        try {
          // Add the code for downloading the CSV file here
            const res = await fetch('${
              window.dbn?.baseUrl || API_BASE_URL
            }${METRIC_DOWNLOAD_RAW_CSV_PATH}', {
        method: 'POST',
        body: JSON.stringify({
          companyIntegrationId: '${companyIntegrationId}',
          integrationName: '${integrationName}',
          query: ${JSON.stringify(query)},
          name: '${fileName}',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const clonedRes = res.clone(); // Clone the response for reading the content

      const reader = clonedRes.body?.getReader();

      let receivedLength = 0;
      const chunks = [];

      if (reader) {
        while (true) {
          const { done: isDone, value } = await reader.read();
          if (isDone) {
            break;
          }
          chunks.push(value);

          receivedLength += value.length;
          const lenghtInKb = Math.round(receivedLength / 1024);

          
          document.getElementById('progress-text').textContent = 'Download Progress: ' + lenghtInKb + ' KB';
        }
      }
      // Concatenate all the chunks into a single Uint8Array
      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }
      // Convert the Uint8Array to a Blob
      const blob = new Blob([chunksAll]);
      // Read the response body as a Blob (binary data)
      // const zipData = await res.blob();

      // Create a temporary URL for the Blob
      const zipUrl = URL.createObjectURL(blob);

      // Create a temporary URL for the Blob
      //const zipUrl = URL.createObjectURL(zipData);

      // Create a link element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = zipUrl;
      downloadLink.download = '${fileName}.zip'; // Specify the filename here
      downloadLink.style.display = 'none';

      // Append the link to the document and trigger the click event
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(zipUrl);

      document.getElementById('progress-text').textContent = 'Download complete';

      // Remove the link from the document
      document.body.removeChild(downloadLink);
      // Close the new tab/window
      document.getElementById('progress-text').textContent = 'Download complete';

            window.close();

        } catch (error) {
          // Handle errors as needed
      // eslint-disable-next-line no-alert
      alert('Error downloading the file. Please try later.');
        }
      }
// Create a button in the new tab's HTML
        const button = document.createElement('button');
        button.textContent = 'Download CSV';
        button.id = 'downcsv_button';
        button.style.display = 'none'
        
        // Attach the event listener within the script
        button.addEventListener('click', () => {
          // Call the downloadCsv function when the button is clicked
          downloadCsv();
        });

        // Append the button to the document
        document.body.appendChild(button);
        
        button.click();
        

       
        

    `;
        newTab.document.body.appendChild(scriptElement);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      // eslint-disable-next-line no-alert
      alert('Error downloading the file. Please try later.');
    }
  }, [companyIntegrationId, integrationName, query, fileName]);
  const downloadCsv = useCallback(async () => {
    try {
      setLoading(true);
      updateDownloadProgress(true);
      const res = await fetch(
        `${window.dbn?.baseUrl || API_BASE_URL}${METRIC_DOWNLOAD_RAW_CSV_PATH}`,
        {
          method: 'POST',
          body: JSON.stringify({
            companyIntegrationId,
            integrationName,
            query,
            name: fileName,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      // const clonedRes = res.clone(); // Clone the response for reading the content

      // const reader = clonedRes.body?.getReader();

      // let receivedLength = 0;
      // const chunks = [];

      // if (reader) {
      //   while (true) {
      //     const { done: isDone, value } = await reader.read();
      //     if (isDone) {
      //       break;
      //     }
      //     chunks.push(value);

      //     receivedLength += value.length;
      //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //     const lenghtInKb = Math.round(receivedLength / 1024);
      //   }
      // }
      // // Concatenate all the chunks into a single Uint8Array
      // const chunksAll = new Uint8Array(receivedLength);
      // let position = 0;
      // for (const chunk of chunks) {
      //   console.log(position);
      //   chunksAll.set(chunk, position);
      //   position += chunk.length;
      // }
      // // Convert the Uint8Array to a Blob
      // const blob = new Blob([chunksAll]);
      // Read the response body as a Blob (binary data)
      const zipData = await res.blob();

      // Create a temporary URL for the Blob
      // const zipUrl = URL.createObjectURL(blob);

      // Read the response body as a Blob (binary data)
      // const zipData = await res.blob();

      // Create a temporary URL for the Blob
      const zipUrl = URL.createObjectURL(zipData);

      // Create a link element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = zipUrl;
      downloadLink.download = `${fileName}.zip`; // Specify the filename here
      downloadLink.style.display = 'none';

      // Append the link to the document and trigger the click event
      document.body.appendChild(downloadLink);
      setLoading(false);
      updateDownloadProgress(false);
      if (IS_SELF_HOSTED && document?.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        downloadLink.dispatchEvent(event);
      } else downloadLink.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(zipUrl);

      // Remove the link from the document
      document.body.removeChild(downloadLink);
    } catch (error) {
      setLoading(false);
      updateDownloadProgress(false);

      // eslint-disable-next-line no-alert
      alert('Error downloading the file. Please try later.');
    }
  }, [companyIntegrationId, integrationName, query, fileName]);

  return (
    <button
      type="button"
      className={className ?? styles.csvlink}
      onClick={downloadCsv}
      disabled={isLoading}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
