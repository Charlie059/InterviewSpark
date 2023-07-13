import React, { useEffect } from 'react';
import Head from 'next/head';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

Modal.setAppElement('#__next');

const TermsDialog = () => {
  const router = useRouter();

  useEffect(() => {
    // Open the dialog after 3 seconds
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(openTimeout);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    router.push('/');
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Head>
        <title>Static Page Dialog</title>
      </Head>
      {/*<h1>Loading...</h1>*/}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        contentLabel="Static Page Dialog"
      >
        <iframe fullwidth src="src/views/pages/misc/terms.html" title="Static Page" />
        <button onClick={handleClose}>Close</button>
      </Modal>
    </div>
  );
};

export default TermsDialog;
