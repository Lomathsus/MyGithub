import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import NUpload from '@/utils/nplus-upload';
import styles from './index.less';
import { PlusOutlined, EyeOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const NUploadView = (props: any, ref: any) => {
  const maxLength: number = props.maxLength || 9;
  const accept: string = props.accept || 'image/*';
  let getFiles: any = props.getFiles || undefined;
  let [fileList, setFileList] = useState(props.fileList || []);
  let [loading, setLoading] = useState(false);
  const inputRef: any = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [viewImg, setViewImg] = useState('');
  const defaultImg = require('../../assets/default-img.jpg');

  useImperativeHandle(ref, () => {
    return {
      setImgList,
    };
  });

  // 获取文件后缀
  const getFileSuffix = (url: string) => {
    let suffix = '';
    if (url) {
      const arr = url.split('.');
      suffix = arr[arr.length - 1].toLocaleLowerCase();
    }
    return suffix;
  };

  // input change
  function changeFile(e: any) {
    setLoading(true);
    let files = e.target.files;
    NUpload.uploadMultiple(
      files,
      '',
      (list: any) => {
        fileList = fileList.concat(list);
        setFileList(fileList);
        getFiles && getFiles(fileList);
        setLoading(false);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      },
      (err: any) => {
        console.log(err);
        setLoading(false);
      },
    );
  }
  // 删除文件
  function delFile(index: number) {
    fileList.splice(index, 1);
    setTimeout(() => {
      let list = JSON.parse(JSON.stringify(fileList));
      setFileList(list);
      getFiles && getFiles(list);
    });
  }
  // 浏览文件
  function viewFile(index: number) {
    setViewImg(fileList[index].url);
    setVisible(true);
  }
  // 隐藏model
  function modelCancel() {
    setVisible(false);
  }
  // 回显图片
  function setImgList(list: any) {
    setFileList(list);
  }
  return (
    <>
      <div className={styles['upload-component-box']}>
        <div className={styles['upload-list']}>
          {fileList.map((item: any, index: number) => (
            <div key={index} className={styles['upload-item']}>
              <img
                src={
                  ['jpg', 'jpeg', 'gif', 'png'].indexOf(getFileSuffix(item.url)) !== -1
                    ? item.url
                    : defaultImg
                }
              />
              <div className={styles.handle}>
                <span onClick={() => viewFile(index)}>
                  <EyeOutlined />
                </span>
                <span onClick={() => delFile(index)}>
                  <DeleteOutlined />
                </span>
              </div>
            </div>
          ))}
          {fileList.length < maxLength && (
            <div className={styles['upload-item']}>
              <div className={styles['upload-btn']}>
                <PlusOutlined />
              </div>
              <input type="file" onChange={(e) => changeFile(e)} accept={accept} ref={inputRef} />
              {loading && (
                <div className={styles.loading}>
                  <LoadingOutlined />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal title="预览" centered visible={visible} footer={null} onCancel={() => modelCancel()}>
        {viewImg && (
          <>
            {['jpg', 'jpeg', 'gif', 'png'].indexOf(getFileSuffix(viewImg)) !== -1 && (
              <img src={viewImg} className={styles['view-img']}></img>
            )}
            {['mp4', '3gp', 'mov', 'avi'].indexOf(getFileSuffix(viewImg)) !== -1 && (
              <video src={viewImg} className={styles['view-img']} controls></video>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default forwardRef(NUploadView);
