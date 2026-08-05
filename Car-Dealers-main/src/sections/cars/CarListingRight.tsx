"use client";
import React, { useState } from 'react';

const CarListingRight: React.FC = () => {
    const [valueRange, setValueRange] = useState<number>(50);
    const min: number = 100;
    const max: number = 500;
    const percentage: number = ((valueRange - min) / (max - min)) * 100;

    return (
        <div className="col-xl-3">
            <div className="car-listing-page-one__right">
                <div className="car-listing__sidebar"> 
                    <div className="car-listing__search car-listing__sidebar-single">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Search" />
                            <button type="submit"><i className="fa fa-search"></i></button>
                        </form>
                    </div>

                    <div className="car-listing__price-ranger car-listing__sidebar-single">
                        <h3 className="car-listing__sidebar-title">Filter Price</h3>
                        <div className="price-ranger">
                            <div className="ranger-min-max-block">
                                <input
                                    type="range"
                                    min={min}
                                    max={max}
                                    value={valueRange}
                                    onChange={(e) => setValueRange(Number(e.target.value))} 
                                    style={{
                                        background: `linear-gradient(to right, #FFB51D ${percentage}%, #ddd ${percentage}%)`
                                    }}
                                />
                                <div className="d-flex justify-content-between valuRange">
                                    <div className="d-flex values">
                                        <span>{valueRange}</span>
                                        <span>-</span>
                                        <span>{max}</span>
                                    </div>
                                    <button>Filter</button> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="car-listing__category car-listing__sidebar-single">
                        <h3 className="car-listing__sidebar-title">Categories</h3>
                        <ul className="list-unstyled">
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skipper1" id="skipper" />
                                    <label htmlFor="skipper"><span></span>All</label>
                                </div>
                                <div className="counts-box">
                                    <p>200</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skipper2" id="skipper2" defaultChecked readOnly/>
                                    <label htmlFor="skipper2"><span></span>sport cars</label>
                                </div>
                                <div className="counts-box">
                                    <p>50</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skipper3" id="skipper3" />
                                    <label htmlFor="skipper3"><span></span>sedan</label>
                                </div>
                                <div className="counts-box">
                                    <p>100</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skipper4" id="skipper4" />
                                    <label htmlFor="skipper4"><span></span>luxury cars</label>
                                </div>
                                <div className="counts-box">
                                    <p>150</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skipper5" id="skipper5" />
                                    <label htmlFor="skipper5"><span></span>Minibus</label>
                                </div>
                                <div className="counts-box">
                                    <p>80</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skipper6" id="skipper6" />
                                    <label htmlFor="skipper6"><span></span>Coupes</label>
                                </div>
                                <div className="counts-box">
                                    <p>60</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skipper7" id="skipper7" />
                                    <label htmlFor="skipper7"><span></span>Trucks</label>
                                </div>
                                <div className="counts-box">
                                    <p>90</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="car-listing__category car-listing__sidebar-single">
                        <h3 className="car-listing__sidebar-title">Car Features</h3>
                        <ul className="list-unstyled">
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skippe01" id="skippe01" />
                                    <label htmlFor="skipper"><span></span>All</label>
                                </div>
                                <div className="counts-box">
                                    <p>200</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skippe02" id="skippe02" defaultChecked readOnly />
                                    <label htmlFor="skipper2"><span></span>Backup Camera</label>
                                </div>
                                <div className="counts-box">
                                    <p>2</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skippe03" id="skippe03" />
                                    <label htmlFor="skipper3"><span></span>Blindspot warning</label>
                                </div>
                                <div className="counts-box">
                                    <p>2</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skippe04" id="skippe04" />
                                    <label htmlFor="skipper4"><span></span>Airbags</label>
                                </div>
                                <div className="counts-box">
                                    <p>2</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skippe05" id="skippe05" />
                                    <label htmlFor="skipper5"><span></span>Parking sensors</label>
                                </div>
                                <div className="counts-box">
                                    <p>2</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="skippe06" id="skippe06" />
                                    <label htmlFor="skipper6"><span></span>Head-up display</label>
                                </div>
                                <div className="counts-box">
                                    <p>20</p>
                                </div>
                            </li> 
                        </ul>
                    </div>

                    <div className="car-listing__category car-listing__tuel-type car-listing__sidebar-single">
                        <h3 className="car-listing__sidebar-title">Fuel Type</h3>
                        <ul className="list-unstyled">
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="f_type1" id="f_type1" />
                                    <label htmlFor="f_type1"><span></span>Diesel</label>
                                </div>
                                <div className="counts-box">
                                    <p>20</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="f_type2" id="f_type2" defaultChecked />
                                    <label htmlFor="f_type2"><span></span>Gasoline</label>
                                </div>
                                <div className="counts-box">
                                    <p>25</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="f_type3" id="f_type3" />
                                    <label htmlFor="f_type3"><span></span>Petrol</label>
                                </div>
                                <div className="counts-box">
                                    <p>29</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="f_type4" id="f_type4" />
                                    <label htmlFor="f_type4"><span></span>Electric</label>
                                </div>
                                <div className="counts-box">
                                    <p>40</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="f_type5" id="f_type5" />
                                    <label htmlFor="f_type5"><span></span>Ethanol</label>
                                </div>
                                <div className="counts-box">
                                    <p>20</p>
                                </div>
                            </li>
                            <li>
                                <div className="checked-box">
                                    <input type="checkbox" name="f_type6" id="f_type6" />
                                    <label htmlFor="f_type6"><span></span>Hybrid</label>
                                </div>
                                <div className="counts-box">
                                    <p>27</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="car-listing__rating car-listing__sidebar-single">
                        <h3 className="car-listing__sidebar-title">Reviews</h3>
                        <div className="car-listing__rating-box">
                            <ul className="list-unstyled">
                                <li>
                                    <input type="radio" id="fivestar" name="rating" defaultChecked />
                                    <label htmlFor="fivestar">
                                        <i></i>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="fourstar" name="rating" />
                                    <label htmlFor="fourstar">
                                        <i></i>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star gray"></span>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="threestar" name="rating" />
                                    <label htmlFor="threestar">
                                        <i></i>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star gray"></span>
                                        <span className="fas fa-star gray"></span>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="twostar" name="rating" />
                                    <label htmlFor="twostar">
                                        <i></i>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star gray"></span>
                                        <span className="fas fa-star gray"></span>
                                        <span className="fas fa-star gray"></span>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="onestar" name="rating" />
                                    <label htmlFor="onestar">
                                        <i></i>
                                        <span className="fas fa-star"></span>
                                        <span className="fas fa-star gray"></span>
                                        <span className="fas fa-star gray"></span>
                                        <span className="fas fa-star gray"></span>
                                        <span className="fas fa-star gray"></span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="car-listing__google-map car-listing__sidebar-single">
                        <h3 className="car-listing__sidebar-title">Google Map</h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
                            className="car-listing__google-map-box" allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CarListingRight;