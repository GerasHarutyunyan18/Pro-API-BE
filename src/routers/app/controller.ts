import { Request, Response } from "express";
import { Errors } from "../../errors";
import Api, { IApi } from "../../models/Api";
import App from "../../models/App";

export const createApp = async (req: Request, res: Response) => {
  try {
    const { app, apis } = req.body;
    const user = (req as any).user;

    const newApp = await App.create({
      ...app,
      ownerId: user._id,
    });

    await Promise.all(
      apis.map(async (el: IApi) => {
        el.appId = newApp._id;
        const { method, body, endpoint, headers, params, appId } = el;

        const createdApi = await Api.create({
          method,
          body,
          endpoint,
          headers,
          params,
          appId,
        });

        return createdApi;
      })
    );

    res.send({ success: true, id: newApp._id });
  } catch (err) {
    console.log("err ==", err)
    res.send({ success: false, errors: [Errors.Internal] });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const apps = await App.find({ ownerId: user._id });

    res.send({ success: true, data: apps });
  } catch {
    res.send({ success: false, errors: [Errors.Internal] });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.send({
        success: false,
        message: Errors.Parameter,
      });
    }

    const app = await App.findById(id);

    if (!app) {
      return res.send({
        success: false,
        message: Errors.AppNotFound,
      });
    }

    const apis = await Api.find({ appId: app._id });

    res.send({ success: true, data: { app, apis } });
  } catch {
    res.send({ success: false, error: Errors.Internal });
  }
};
