import {load} from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import {createClient} from "https://esm.sh/@supabase/supabase-js@2";

const env = await load();

export default createClient(env["SUPABASE_URL"], env["SUPABASE_API_KEY"]);
