import { GetServerSidePropsContext } from "next";
import { getAuthSession } from "./getAuthSession";

const getCallbackURI = (url?: string) => {
  if (!url) {
    return undefined;
  }
  return encodeURIComponent(url);
};

type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

export type InferWithAuthServerSideProps<
  T extends (...args: any) => Promise<{ props: any }>
> = AsyncReturnType<T>["props"];

type WithAuthServerSidePropsOptions = {
  redirect?: {
    destination?: string;
  };
};

type EmptyProps = {
  props: Record<string, unknown>;
};

export const withAuthServerSideProps = <T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (ctx: GetServerSidePropsContext) => Promise<T>,
  options: WithAuthServerSidePropsOptions = {}
) => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<{ props: T["props"] }> => {
    const session = await getAuthSession(ctx);
    const callbackURI = getCallbackURI(ctx.req.url);

    if (!session) {
      return {
        redirect: {
          destination:
            options?.redirect?.destination ||
            `/auth/signin?${callbackURI ? `callbackUrl=${callbackURI}` : ""}`,
          permanent: false,
        },
        props: { from: ctx.req.url },
      } as unknown as { props: T["props"] };
    }

    if (getServerSidePropsFunc) {
      return {
        props: {
          ...((await getServerSidePropsFunc(ctx)).props || {}),
        },
      };
    }

    return {
      props: {},
    };
  };
};
