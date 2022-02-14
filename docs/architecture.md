# Impressionist Architecture

This section helps you to understand the basic components of the Impressionist Library by giving you a glance of the different components and how they are organized.


## Query Library

As we covered in the previous pages, Selectors implement logic to interact with DOM elements or values in a query chain. Selectors are part of the **Query library** which has a simple architecture that allows to extend its functionalities.

In the following diagram, we can see how the different Selectors inherit their base logic from the Selector class.

![Query Library](https://www.platosolutions.io/impressionist/query-library.png)

This architecture makes easy to extend the Query library just creating a new class that extends the Selector superclass and then implementing its own logic.

## Collector

The purpose of this library is to collect the values from the query chain executions.  This responsibility involves to create a data structure for each query chain and handle the iterations of executions of those query chains. The following picture describes the basic architecture of this library:

![Basic Collector Library](https://www.platosolutions.io/impressionist/collector-library-basic.png)

As we can see there, the Collection class knows how to execute queries, which, in is most cases, it involves to know when and how iterate Selectors. Let's think for example on the "***elements***" Selector, which has an inner structure with its own queries. This is a specific Selector made up by Collector and Collection instances, and therefore, it not only collects the elements, but also, knows how to iterate the queries over those elements. That kind of logic can be described in the following picture:

![Collector Library](https://www.platosolutions.io/impressionist/collector-library-advanced.png)


## Links

Impressionist Library
https://drive.google.com/file/d/1nAWosxmCMBW7T1EPQK6WJX0R3aM7F5As/view?usp=sharing


Collector Library
https://drive.google.com/file/d/1fC6pnyT7UpszqYlxcHeeYSRzvkcgvg8d/view?usp=sharing


Query Library
https://drive.google.com/file/d/108TB_ugIsZl6Ikl_qAokUCLrn04hVP4b/view?usp=sharing

