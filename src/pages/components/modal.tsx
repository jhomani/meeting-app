import React, {useEffect, useState} from 'react';

import {Button, Modal, getRawMessage} from '@components/index';
import {useSelector} from 'react-redux';
import {Danger} from '@src/icons';

const {confirm, undoAction} = Modal;

const IntoModal = () => {
  const {locale} = useSelector((store: MainStorage) => store.app);

  useEffect(() => {
    console.warn('Into first modal content!!!!');

    return () => {
      console.log('Unmout modal 1');
    };
  }, []);

  return <div>Hello world from modal {locale}!!!!</div>;
};

const IntoModal2 = () => {
  const {locale} = useSelector((store: MainStorage) => store.app);

  useEffect(() => {
    console.warn('Into first modal 22 content!!!!');
    return () => {
      console.log('Unmout modal 2');
    };
  }, []);

  return <div>Hello world from modal 2 {locale}!!!!</div>;
};

const ModalPage = () => {
  console.log('refesh this component');
  const [visible, setVisible] = useState(false);
  const [visibles, setVisibles] = useState(false);

  const handleConfirm = async () => {
    const sure = await confirm({
      cancel: getRawMessage('cancel'),
      ok: getRawMessage('sure'),
      icon: <Danger size={40} color="#ff4a4a" />,
      message: 'Que pasa, estas seguro en eliminar este registro para siempre?',
      danger: true,
    });

    console.log('Confirm ->', sure);
  };

  const handleConSuc = async () => {
    const sure = await confirm({
      cancel: getRawMessage('cancel'),
      ok: getRawMessage('sure'),
      message: getRawMessage('deleteForever'),
    });

    console.log('Confirm ->', sure);
  };

  const handleUndoAction = async (type: 'success' | 'error' | 'info') => {
    const sure = await undoAction({
      message: getRawMessage('deleteForever'),
      type,
    });

    console.log('Confirm ->', sure);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 20,
        maxWidth: 700,
        margin: '50px auto',
      }}
    >
      <Button onPress={() => setVisible(true)} content="Open Agree Modal" />

      <Button onPress={() => setVisibles(true)} content="Open Modal 2" />

      <Button type="error" onPress={handleConfirm} content="Confirm Modal" />
      <Button onPress={handleConSuc} content="Confirm Success" />
      <Button
        type="secondary"
        onPress={handleConfirm}
        content="Confirm Waring"
      />
      <Button onPress={handleUndoAction} content="Undo Action" />
      <Button
        onPress={handleUndoAction.bind(null, 'success')}
        content="Success Message"
      />
      <Button onPress={handleUndoAction} content="Error Message" />
      <Button onPress={handleUndoAction} content="Info Message" />

      <Modal
        onCancel={setVisible.bind(null, false)}
        header="Hello from modal 1"
        xPosition="top"
        visible={visible}
      >
        <IntoModal />
      </Modal>

      <Modal onCancel={() => setVisibles(false)} visible={visibles}>
        <IntoModal2 />
      </Modal>
    </div>
  );
};

export default ModalPage;
