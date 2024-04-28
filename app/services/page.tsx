////
import { createClient } from "@/utils/supabase/server";
export default async function ServicesPage() {
  const supabase = createClient();
  const { data: services, error } = await supabase.from("services").select("*");
  //   console.log(services);
  return (
    <div>
      Hello World
      <ul>
        {services?.map((service) => (
          <li key={service.service_id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            {Object.keys(service).some((key) => key.startsWith("images/")) && (
              <div>
                {Object.keys(service)
                  .filter((key) => key.startsWith("images/"))
                  .map((imageUrlKey) => (
                    <img src={service[imageUrlKey]} alt={service.name} />
                  ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <p></p>
    </div>
  );
}
