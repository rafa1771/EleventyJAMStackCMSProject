---
title: The Machine That Learned to Wait
description: This is, by some margin, the longest Aside I have written. It concerns an AI system that began by reading warehouse emails and gradually acquired tasks, authority, safeguards, colleagues, a printer, and several reasons to become less confident.
author: Vizt Nivlir
date: 2026-09-26T18:56:00.000+02:00
tags:
  - post
  - architecture
image: /assets/asides/vizt-warehouse-automation-2.jpg
imageAlt: Eventually, waiting became part of the architecture.
---

A note before beginning: this is not, strictly speaking, an aside.

It is rather long.

Most Asides can be read over coffee. This one may require the coffee and whatever follows it. I considered dividing it into several pieces, but that would make the story tidier than the thing itself, and tidiness is already one of the problems we shall encounter.

For some time, I have been working on an AI system for a logistics operation. Its purpose sounds straightforward: read incoming customer email, understand what is being requested, find the relevant operational information, and help the people responsible for deciding what happens next.

It has taken eight generations of the system to discover what “next” means.

There is a particular kind of optimism involved in teaching a machine to read email.

Email, after all, gives the appearance of structure. There is a sender. There is a subject. There is a body. Sometimes there is an attachment. One might reasonably imagine that the contents could therefore be sorted into similarly tidy categories: _Where is my order? Cancel this shipment. Change this address. Please print this. The truck will arrive at three._

This is roughly where the system began.

The difficulty was that human beings had been using email for some time before it arrived, and had developed their own conventions.

They forward old messages without explanation. They reply to one subject while discussing another order. They call purchase orders “orders,” warehouse orders “POs,” containers “loads,” and occasionally identify something only as “this.” They send a spreadsheet and write “see attached.” Freight forwarders discuss several customers in the same thread. A five-digit number might be an order reference, unless it is a ZIP code. Someone writes “release” and may mean release an order, release freight, release a container, or simply that something has been released already.

The machine entered this environment with confidence.

We have since been working on the confidence.

## I. In the Beginning, There Were Categories

The first version was comparatively innocent.

It learned to classify messages. A customer email arrived; the system attempted to decide what sort of email it was. It extracted order numbers and other useful details and placed the message into a category.

There were machine-learning models. There were training datasets. There were approximately ten gigabytes of model files. Considerable computational apparatus was assembled so that a computer could eventually announce that an email saying “where is order 1234567?” was probably a status request.

This was useful.

It was also the beginning of a long education in the distinction between _understanding a sentence_ and _being trusted with a warehouse_.

The second generation replaced much of this machinery with language models. The third connected the system to the outside world: email, the warehouse-management system, notifications, identity checks.

By the fourth, it had begun to acquire something resembling judgment.

Not judgment in the philosophical sense. We should remain composed.

It learned, for example, that not every email deserved the expense and uncertainty of an AI model. Automated notifications were automated notifications. Internal company mail was internal company mail. Warehouse-system alerts could be recognized by ordinary rules.

The clever system therefore became clever enough to know when cleverness was unnecessary.

This remains one of its better qualities.

## II. The Assistant Acquires a Name

By the fifth generation, the system had acquired a name and its own email address.

Staff could write to it and ask about an order. It could consult the warehouse-management system and return a structured answer.

This changed the nature of the project.

The system was no longer merely sorting correspondence in the background. It was becoming an operational participant.

A limited one, certainly. It could look. It could explain. It could report.

It could not yet be trusted to wander through the warehouse systems making decisions on its own.

There are moments in software development when this distinction appears excessively cautious.

Later, they tend to be remembered as the sensible period.

The sixth generation made its world more complicated. One email could contain several requests, so the system learned to split messages into separate intentions. Different AI models could be used to classify them. Multiple classifications could vote. Another model could veto the result when the others disagreed.

An oversight agent watched from the side.

The architecture was beginning to resemble a small civil service.

This was not entirely accidental.

The underlying problem was becoming clear: an AI model could be remarkably good at understanding language and still be an inappropriate place to put authority.

So authority began moving elsewhere.

Rules determined whether the sender was known. Rules determined whether an order number was valid. Rules determined whether the system was permitted to respond. Rules determined whether customer information could safely be shown. Rules determined whether an action could proceed.

The AI interpreted.

The system decided what interpretation was allowed to mean.

That distinction became the architecture.

## III. The Period of Restraint

The seventh generation was when the system learned to propose rather than perform.

This sounds modest. It was, in fact, a fairly substantial change.

Suppose a customer writes:

_Please cancel order 1234567._

An ordinary automation system might recognize the request and cancel the order.

Ours does not.

It creates a **task object**.

The task object says, in effect:

_I believe this customer wants this order cancelled. Here is the order. Here is the action I propose. Here is the risk involved. Here is what would happen if someone permits me to continue._

Then it asks a human.

The relevant customer-service representative receives an approval request. She may accept it, reject it, or decide that she will handle the matter herself.

Only after approval does the proposed action approach the dispatcher.

And the dispatcher is not sentimental.

It checks whether the action has already happened. It checks whether approval exists. It checks whether the proposed action contains everything required to execute it. It checks whether the action is permitted. It checks whether execution is enabled at all.

Later, another validation layer was added immediately before execution. It asks the warehouse system again whether reality is still the reality on which the approval was based.

Perhaps the order has shipped in the meantime.

Perhaps someone else cancelled it.

Perhaps the task is now too old to be trusted.

The system then declines to act.

This is not failure.

It is one of the central accomplishments of the project.

A system capable of action must also be capable of discovering, at the final moment, that action has become inappropriate.

Humans have traditionally called this judgment. It seemed reasonable not to automate it carelessly.

## IV. Then the Warehouse Became More Specific

The system gradually learned that warehouses contain rather more than orders.

There are returns. Inventory adjustments. Shipping-method changes. Address changes. Bills of lading. Advance shipping notices. Packing lists. Commercial invoices. Containers. Freight appointments. Receiving discrepancies.

There are also freight forwarders and carriers who may legitimately discuss several customers.

This presented an interesting problem.

Previously, knowing the sender often helped determine the customer.

But a freight forwarder may represent Customer A on Monday morning and Customer B by lunch. The sender is trustworthy; the customer association is not.

So the system learned another distinction:

**I know who you are** is not the same statement as **I know whose business you are discussing**.

Shared contacts are therefore recognized without automatically inheriting a customer account. The system looks instead for evidence inside the message: a validated order, an explicitly named account, or trustworthy context from the existing thread.

Without enough evidence, it refrains from attaching customer data.

This is a recurring motif in its education.

It is increasingly allowed to know things.

It is not therefore increasingly allowed to assume things.

## V. The Small Matter of Reality

Eventually the system became sophisticated enough that the question of autonomy could no longer be postponed indefinitely.

It could identify customers.

It could understand requests.

It could verify orders against the warehouse system.

It could create structured tasks.

It could request approval.

It could execute approved actions.

It could print warehouse documents through local computers.

It could change an address and preserve enough information to restore the previous one.

It could cancel an order and verify afterward that the cancellation had actually occurred.

It could maintain an audit trail of what it thought, what a human decided, what it attempted, and what happened.

The eighth generation was therefore intended to prepare the system for autonomy.

This is where the story became more interesting.

The first question was obvious:

**How accurate is the system when humans are asked to judge its decisions?**

This required measurements.

The measurements existed.

Unfortunately, some of them were wrong.

The weekly report was describing an action that had been approved by a human and successfully executed as though it were still waiting for someone to do something.

The action had happened.

The reporting system did not know that it had happened.

This was awkward because those same reports were intended to determine whether the system was ready to operate with less supervision.

The system responsible for proving that the system was ready for automation was itself misreading the evidence.

There is a certain architectural neatness to this kind of problem.

One could even admire it, from a distance.

The eighth generation therefore became less about adding autonomy and more about establishing whether the evidence supporting autonomy could be believed.

The answer, initially, was no.

So the project did not advance to autonomous operation.

That decision may be more important than several features that did.

## VI. The Emails That Disappeared Without Technically Disappearing

The next revision went looking for similar problems.

It found them.

A customer sent a cancellation request.

A customer-service representative sent an approval decision.

Legitimate customers passed through identity checks.

In several cases, the system processed these events incorrectly and then quietly discarded the consequences.

Nothing dramatic occurred.

There was no spectacular crash screen. No database caught fire. No server emitted smoke.

The messages simply failed to reach the next person or process that depended on them.

This is the more dangerous class of failure.

A crash is impolite but informative.

Silence is composed.

Sometimes excessively so.

One guard designed to protect email processing could itself crash the email it was protecting. Dispatcher refusals were printed to the server console and then vanished rather than becoming durable records. A human decision could be received and then discarded without telling the person who made it. Two pieces of identity logic compared the human-readable contents of an email's `From` header with a bare email address and concluded, with admirable consistency, that legitimate people were not themselves.

The system was not misunderstanding the customers.

The surrounding machinery was misunderstanding the system.

This distinction matters.

It also explains the current character of the architecture.

There are now explicit events for things that previously happened only in memory. Refusals are recorded. Approval decisions are recorded. Execution starts and completions are recorded. Failed actions are surfaced to humans instead of merely appearing in server output.

Cancellation verification now works in both directions.

Previously, a successful response from an external system might be treated too readily as evidence that the order had actually changed. Now the resulting state is checked.

But the inverse matters too.

A technical failure does not necessarily prove that nothing happened.

Networks are capable of failing after the remote system has already performed the requested operation. So the system now verifies reality rather than treating the transport protocol as metaphysics.

A success response is not necessarily success.

An error response is not necessarily failure.

The order itself gets the final word.

## VII. The Organization Enters the Architecture

There remained another problem.

This one could not be solved simply by correcting a function.

The plan for controlled autonomy depends on an **agreement corpus**: a body of evidence showing how often the system's proposed decisions agree with the decisions made by the people who actually run the operation.

For that corpus to exist, someone has to respond to the approval requests.

ACCEPT.

REJECT.

MANUAL.

On an architecture diagram, this is a very small step.

In an operating company, it arrives among all the other small steps.

There are customers waiting for answers, calls to return, shipments moving, exceptions requiring attention, existing procedures, familiar inbox habits, and the persistent tendency of urgent work to consume the merely important. An approval request that takes only a few seconds still has to compete for those seconds.

This exposed another assumption in the design.

I had treated human approval principally as a safety mechanism: the system proposes, the person decides, and the resulting decisions provide evidence about whether the system can eventually be trusted with more authority.

Operationally, however, approval is also work.

Small work, certainly.

But organizations are largely composed of small work.

If the approval step does not fit naturally enough into the existing flow of attention, the evidence accumulates slowly. That does not necessarily tell us that the people are resistant, nor that the technology has failed. It tells us that a technically sound control can still have an organizational cost.

The system therefore needed another mechanism, though a deliberately modest one:

a weekly progress report.

It records how many decisions have been made, how many eligible requests remain without decisions, and how much evidence has accumulated toward the next stage.

It is deliberately not a leaderboard.

It does not scold.

It does not gamify.

It makes the dependency visible.

If participation increases, the agreement corpus grows and the system can be evaluated.

If it remains sparse, that too is useful information. It may mean the approval mechanism needs to fit the work differently. It may mean the value of the next stage has not yet justified the additional interaction. It may simply mean that the organization has more immediate things to do.

Software is occasionally useful for discovering that the problem is not software.

More precisely, it is useful for discovering that software has reached the boundary where the rest of the organization begins.

That boundary has become one of the more interesting parts of the project.

## VIII. Who, Precisely, Is Responsible?

The present system has also become unusually interested in ownership.

Not database ownership.

Human ownership.

Every customer may have an assigned representative. Some have more than one. A representative may be out of office. Another person may cover for them. Unowned mail can enter a rotation. Monitoring addresses may receive copies without becoming responsible for the work.

These distinctions sound administrative because they are administrative.

They are also essential.

A notification sent to five people is not necessarily owned by five people.

It may, in practice, be owned by nobody.

The current system therefore records not merely who received a message, but who is expected to act on it.

If the normal representative is away, it looks for a named substitute.

If there is no substitute, it assigns someone through a rotation.

If that substitute approves an action, something more subtle happens: responsibility follows the decision.

The substitute does not merely press ACCEPT and return the client to an absent colleague.

The approval makes the consequence theirs.

If the customer replies, the follow-up returns to the person who made the decision. When the normal representative returns, ownership can revert, but the history remains visible.

This is not really email routing anymore.

It is an attempt to represent organizational responsibility in software.

The distinction is worth making because many automation projects begin by mapping processes and discover, somewhat later, that the processes were never the difficult part.

The difficult part was always deciding who was responsible when the process stopped being ordinary.

## IX. And There Is a Printer

We should mention the printer.

Warehouses remain stubbornly physical places.

At some point an intelligent email system that reasons about customer identity, confidence scores, approval provenance, idempotency, reversible actions and deterministic safety boundaries must print a piece of paper.

The original printer integration assumed that the cloud service could push jobs directly into warehouse computers.

The warehouse firewall had opinions about this.

The design was reversed.

Now local printer agents running on warehouse computers ask the central system whether there is anything waiting to be printed. If there is, they collect the job, print it, and report whether they succeeded.

The cloud no longer attempts to enter the warehouse.

The warehouse occasionally looks outside and asks whether there is paperwork.

This arrangement is less ambitious.

It also works.

Architecture improves considerably once it stops taking rejection personally.

## X. Where the System Stands Now

The current system is in its eighth generation.

It can read operational email and distinguish many kinds of requests. It can recognize customers, shared freight contacts and internal staff. It can associate messages with the correct customer account when the evidence warrants it. It can look up live warehouse information. It can suppress sensitive information when identity or account alignment is uncertain.

It can create structured tasks.

It can ask humans to approve them.

It can execute certain approved actions through a dispatcher surrounded by deterministic controls.

It can cancel orders, send replies, change addresses, restore reversible changes, and place print jobs into a warehouse queue.

It watches the state of the world again immediately before dangerous actions.

It keeps records of decisions, approvals, refusals and executions.

It knows that the person copied on an email is not necessarily the person responsible for it.

It knows that a freight forwarder can be trustworthy without belonging to a customer.

It knows that a valid order number does not prove the identity of the person asking about it.

It knows that a server saying “success” does not prove success.

It knows that a server saying “failure” does not prove failure.

And, increasingly, it knows when it does not know enough.

This is the point at which the project currently waits.

The next generation is intended to begin controlled autonomous action.

But it is not unlocked by another feature.

It is unlocked by evidence.

The system must accumulate enough real decisions to demonstrate that its judgment agrees with the people whose work it may eventually perform without asking them each time. The reporting must be trustworthy. The audit trail must be complete. Silent failures must be surfaced. Responsibility must remain visible. The controls must continue to work when the system is wrong, because eventually it will be.

And the approval process itself must make sense inside the organization that is being asked to use it.

Only then does autonomy become an engineering decision rather than an act of optimism.

There is a temptation, when building AI systems, to measure progress by how much human involvement can be removed.

This project has arrived at almost the opposite conclusion.

The important question is not how quickly the human can be taken out of the loop.

It is whether the loop has been understood well enough that we know **which human judgment can safely be removed, which should be relocated, and which must remain exactly where it is**.

The system began as a classifier.

Then it became an assistant.

Then an operator awaiting permission.

Somewhere along the way, the project itself changed.

The difficult questions are no longer primarily about whether a language model can understand an email, or whether an API can cancel an order. Those are technical questions, and technical questions are often rather obliging: eventually they permit an answer.

The harder questions concern where authority should live, how responsibility should move, what evidence is sufficient, and how a new system enters an organization without asking the organization to become a different one merely for the convenience of the software.

That last point matters.

Good automation should not require people to behave like components in its architecture.

The architecture should have enough humility to accommodate the people already doing the work.

And so the next version can wait.

Not because the technology has nothing more to do, nor because the organization has failed to catch up with it, but because the evidence is not yet complete.

There are worse reasons to wait.
