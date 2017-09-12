import fetch from 'utils/fetch';

export default function getDetailData() {
  const data = {
    channel: 'ios',
    onlyCode: '222222'
  };
  return fetch({
    url: '/tourism/getTourismInfo.htm',
    method: 'post',
    data
  });
}
