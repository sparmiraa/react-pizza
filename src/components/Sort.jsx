import arrowTopImg from "../assets/img/arrow-top.svg"

export default function Sort() {
    return(
        <div className="sort">
        <div className="sort__label">
          <img src={arrowTopImg} alt="" style={{marginRight: '0.5rem'}}/>
          <b>Сортировка по:</b>
          <span>популярности</span>
        </div>
      </div>
    )
}