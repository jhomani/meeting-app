import {
  getRawMessage,
  Language,
  DropDown,
} from '@components/index';
import {addBannerTag} from 'src/redux/tags/actions';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const availableForMural: {key: any; label: any;}[] = [];

const TaggerContainer = () => {
  // const {tags: {tags, banner}} = useSelector((store: MainStorage) => store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const addDelMuralTag = async (tid: number, del = false) => {
    try {
      setLoading(true);

      await new Promise((resolve, reject) =>
        dispatch(addBannerTag({
          resolve,
          reject,
          tid,
          // mid: banner.id,
          del
        }))
      );
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => { }, []);

  return <>
    <div className="tagger">
        <h4 className="tagger-title g-my-5">
          Add New Dessert
        </h4>
        <div className='form'>
          <input type="text" placeholder='Name' />
        </div>
    </div>
  </>;
};

export default TaggerContainer;
