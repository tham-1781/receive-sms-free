/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, Request } from 'express';
import { getCountry } from '../services/country.service';
import { getPhoneNumberByCountry } from '../services/phoneNumber.service';
import logger from '../config/logger';
import { validateCountryCode } from '../validations/country.validation';
import Country from '../models/country.model';
import { MEDIUM_PAGE_LIMIT } from '../utils/constants';

export const getPhoneNumbers = async (req: Request, res: Response) => {
  try {
    const countryCode = req.params.code;
    if (!validateCountryCode(countryCode)) return res.render('404');

    const country = await getCountry(countryCode);
    if (!country) return res.render('404');

    const phoneNumbers = await getPhoneNumberByCountry(country._id);
    const result = { country, phoneNumbers };

    res.render('countries/show', result);
  } catch (err) {
    logger.error(err);
    res.status(500).send(req.t('shared.internal_server_err'));
  }
};

export const indexCountry = async (req: Request, res: Response) => {
  const options = {
    query: {},
    sort: { name: 1 },
    page: req.query.page,
    limit: MEDIUM_PAGE_LIMIT,
  };

  const countryData = await Country.paginate(options);

  res.render('countries/index', { countryData: countryData });
};
