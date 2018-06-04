const projectName = 'bloge';

export class LocalStorage {

  static get(key) {

    const item = localStorage.getItem(`${projectName}/${key}`);

    if (item === null) {
      return null;
    }

    try {
      //$FlowFixMe: value can be null but it's in `try` statement
      return JSON.parse(item);
    } catch (e) {
      console.warn(e);
      return item;
    }
  }

  static set(key, value) {

    try {

      localStorage.setItem(`${projectName}/${key}`, JSON.stringify(value));
    } catch (e) {

      if (process.env.NODE_ENV !== 'production') {
        console.warn(e);
      }
      localStorage.setItem(`${projectName}/${key}`, value);
    }
  }

  static remove(key) {

    if (Array.isArray(key)) {
      key.forEach(k => {
        localStorage.removeItem(`${projectName}/${k}`);
      });
    } else {
      localStorage.removeItem(`${projectName}/${key}`);
    }
  }
}

export class Cookie {
  static get(key) {
    const cookieArray = document.cookie.split(';');
    const arrLen = cookieArray.length;
    for (let i = 0; i < arrLen; ++i) {
      if (cookieArray[i].trim().match('^' + key + '=')) {
        return cookieArray[i].replace(`${key}=`, '').trim();
      }
    }
    return null;
  }
}
