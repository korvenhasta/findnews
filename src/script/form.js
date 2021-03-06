export default class Form {
  constructor(element, onSearch) {
    const form = this;
    this._onSearch = onSearch;
    this._isBlocked = false;
    this._searchInput = element.querySelector('.search__input');
    this._searchButton = element.querySelector('.search__button');
    element.addEventListener('submit', event => form.formSubmitHandler(event));
    element.addEventListener('input', () => form.validate());
    this.validate();
  }

  /* Сеттер для того, чтобы посетить тему в инпут */
  set topic(searchTopic) {
    this._searchInput.value = searchTopic;
  }

  get topic() {
    return this._searchInput.value;
  }

  /* Метод. Блокируем форму */
  block() {
    if(this._isBlocked) {
      return;
    }
    this._isBlocked = true;
    this._searchInput.disabled = true;
    this._searchButton.disabled = true;
  }

  /* Метод. Снимем блокировку с формы */
  unBlock() {
    if(!this._isBlocked) {
      return;
    }
    this._isBlocked = false;
    this._searchInput.disabled = false;
    this._searchButton.disabled = false;
  }

  /* Метод. Обрабатываем сабмит формы */
  formSubmitHandler(event) {
    event.preventDefault();
    if(!this._searchInput.checkValidity()) {
      return;
    }
    if(this._isBlocked) {
      return;
    }
    this.block();
    this._onSearch(this._searchInput.value);
  }

  /* Метод. Валидируем инпут */
  validate() {
    if (this._searchInput.value === "") {
      this._searchInput.setCustomValidity("Нужно ввести ключевое слово");
    }
    else {
      this._searchInput.setCustomValidity("");
    }
  }
}
